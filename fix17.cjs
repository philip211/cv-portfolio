const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(
    'className="space-y-8 relative z-10"\n          className="space-y-8"',
    'className="space-y-8 relative z-10"'
);

// Looks like CornerBrackets and ScanLine might not have been applied
c = c.replaceAll(
    '<div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>',
    '<div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>\n                <CornerBrackets />\n                <ScanLine />'
);

fs.writeFileSync('src/App.tsx', c);
console.log('Fixed duplications and imports');
