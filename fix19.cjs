const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

const tOld = '<div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>';
const tNew = '<div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>\n                <CornerBrackets />\n                <ScanLine />';

c = c.replaceAll(tOld, tNew);

fs.writeFileSync('src/App.tsx', c);
console.log('Fixed corner brackets for projects');
