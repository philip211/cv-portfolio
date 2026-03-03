const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The issue is '{i18n.language === 'en' ? '' : ''}' instead of "{i18n.language === 'en' ? '...' : '...'}"
// Let's just fix '{i18n.language === \'en\' ? \'\' : \'\'}' literal to valid string

code = code.replace(/\{i18n\.language === 'en' \? '' : ''\}/g, "''");

fs.writeFileSync('src/App.tsx', code);
