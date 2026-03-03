const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace('id="home" className="space-y-8 relative z-10"\n          className="space-y-8"', 'id="home" className="space-y-8 relative z-10"');

// Looks like the earlier replacement for CornerBrackets failed, let's try another approach for project cards
c = c.replace(
  '<div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>',
  '<div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>\n                <CornerBrackets />\n                <ScanLine />'
);

// We have multiple instances of this, let's replace all
c = c.replaceAll(
  '<div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>',
  '<div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>\n                <CornerBrackets />\n                <ScanLine />'
);

// What about the other project cards? Let's read App.tsx to make sure it matched.

fs.writeFileSync('src/App.tsx', c);
console.log('Fixed duplications');
