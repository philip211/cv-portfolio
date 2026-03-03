const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(/className="space-y-8 relative z-10"(\s*)className="space-y-8"/g, 'className="space-y-8 relative z-10"');

fs.writeFileSync('src/App.tsx', c);
