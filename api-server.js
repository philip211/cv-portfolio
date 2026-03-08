// Simple Express server for xAI Voice API proxy
// This keeps your API key secure on the backend

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'xAI Voice API Proxy' });
});

// Voice intro endpoint - generates audio from text using xAI TTS API
app.post('/api/voice-intro', async (req, res) => {
  try {
    const { text, voice_id = 'ara' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Validate voice_id
    const validVoices = ['eve', 'ara', 'rex', 'sal', 'leo'];
    if (!validVoices.includes(voice_id)) {
      return res.status(400).json({ 
        error: `Invalid voice_id. Must be one of: ${validVoices.join(', ')}` 
      });
    }

    // Check for API key
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      console.error('XAI_API_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error: XAI_API_KEY not set' 
      });
    }

    // Call xAI TTS API
    console.log(`Generating audio with voice: ${voice_id}, text length: ${text.length}`);
    
    const response = await fetch('https://api.x.ai/v1/tts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voice_id
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`xAI API error: ${response.status}`, errorText);
      return res.status(response.status).json({ 
        error: `xAI API returned ${response.status}`,
        details: errorText
      });
    }

    // Get audio buffer from xAI
    const audioBuffer = await response.arrayBuffer();
    
    // Set proper headers for audio response
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.byteLength,
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    });

    // Send audio buffer
    res.send(Buffer.from(audioBuffer));
    
    console.log(`✓ Audio generated successfully (${audioBuffer.byteLength} bytes)`);

  } catch (error) {
    console.error('Error generating voice:', error);
    res.status(500).json({ 
      error: 'Failed to generate voice',
      message: error.message 
    });
  }
});

// Voice Agent token endpoint - creates ephemeral token for realtime WebSocket connection
app.post('/api/voice-agent-token', async (req, res) => {
  try {
    const { voice = 'Ara' } = req.body;

    // Check for API key
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      console.error('XAI_API_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error: XAI_API_KEY not set' 
      });
    }

    // Request ephemeral token from xAI
    console.log(`Creating ephemeral token for voice agent with voice: ${voice}`);
    
    const response = await fetch('https://api.x.ai/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-2-1212-realtime',
        voice: voice
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`xAI API error: ${response.status}`, errorText);
      return res.status(response.status).json({ 
        error: `xAI API returned ${response.status}`,
        details: errorText
      });
    }

    // Return ephemeral token
    const tokenData = await response.json();
    res.json(tokenData);
    
    console.log(`✓ Ephemeral token created successfully`);

  } catch (error) {
    console.error('Error creating voice agent token:', error);
    res.status(500).json({ 
      error: 'Failed to create voice agent token',
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('\n🎙️  xAI Voice API Proxy Server');
  console.log(`📡 Running on http://localhost:${PORT}`);
  console.log(`🔑 API Key: ${process.env.XAI_API_KEY ? '✓ Set' : '✗ Missing'}\n`);
  
  if (!process.env.XAI_API_KEY) {
    console.warn('⚠️  Warning: XAI_API_KEY environment variable is not set!');
    console.warn('   Create a .env file with: XAI_API_KEY=your_api_key_here\n');
  }
});

export default app;
