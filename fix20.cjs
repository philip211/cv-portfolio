const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace('className="space-y-8 relative z-10" \n          className="space-y-8"', 'className="space-y-8 relative z-10"');
c = c.replace('className="space-y-8 relative z-10"\n          className="space-y-8"', 'className="space-y-8 relative z-10"');
c = c.replace('id="home" className="space-y-8 relative z-10" \n          className="space-y-8"', 'id="home" className="space-y-8 relative z-10"');

fs.writeFileSync('src/App.tsx', c);
