const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// looking for "{i18n.language === "en" ? "..." : "{i18n..."}"
const regex = /"\{i18n\.language === "en" \? "(.*?)" : "(.*?)"\}"/g;
code = code.replace(regex, "{i18n.language === 'en' ? '' : ''}");

fs.writeFileSync('src/App.tsx', code);
