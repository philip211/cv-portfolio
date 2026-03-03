const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

if (!c.includes('TechBackdrop')) {
    c = c.replace(
        "import { BootSequence", 
        "import { TechBackdrop, FloatingGlyph, CornerBrackets, ScanLine } from './components/Decor';\nimport { BootSequence"
    );
    fs.writeFileSync('src/App.tsx', c);
    console.log('Added imports to App.tsx');
}
