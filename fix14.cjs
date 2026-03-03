const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(
    '<span>Engineering Deep Dive</span>',
    '<span>{i18n.language === "ru" ? "Глубокое погружение (Инженерия)" : "Engineering Deep Dive"}</span>'
);

c = c.replace(
    '>Technology Stack</h2>',
    '>{i18n.language === "ru" ? "Технологический стек" : "Technology Stack"}</h2>'
);

c = c.replace(
    '>Projects</h2>',
    '>{i18n.language === "ru" ? "Проекты" : "Projects"}</h2>'
);

c = c.replace(
    '>AI Dev Pipeline</h2>',
    '>{i18n.language === "ru" ? "AI Pipeline Разработки" : "AI Dev Pipeline"}</h2>'
);

fs.writeFileSync('src/App.tsx', c);
console.log('Fixed headings');
