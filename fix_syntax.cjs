const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// The main issue in TS errors is overlapping nested tags and mismatched {}.
// Let's just find all places where {i18n.language === 'en'} are double-wrapped 
// like >{i18n.language === ...}</strong>< etc and fix.

// It's safer to just revert and do it properly, since git wasn't tracking properly.
const revertRegex = /\{i18n\.language === 'en' \? '(.*?)' \: '(.*?)'\}/g;
let original = content.replace(revertRegex, (m, g1, g2) => {
    return g2.replace(/\\'/g, "'");
});

fs.writeFileSync('src/App.tsx.backup', content, 'utf8');

fs.writeFileSync('src/App.tsx', original, 'utf8');
console.log('Reverted to Russian for now');
