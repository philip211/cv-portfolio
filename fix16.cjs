const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(
    'Rule: AI speeds me up. Engineering keeps it stable.',
    '{i18n.language === "ru" ? "Правило: ИИ ускоряет процесс. Инженерия делает его стабильным." : "Rule: AI speeds me up. Engineering keeps it stable."}'
);

const liMap = {
    'spec': 'спеки',
    'diagrams': 'схемы',
    'code': 'код',
    'review notes': 'правки (ревью)',
    'test skeleton': 'скелет тестов',
    'release checklist': 'релиз-чеклист'
};

for (const [en, ru] of Object.entries(liMap)) {
    c = c.replace(`<li>{${en}}</li>`, `<li>{i18n.language === "ru" ? "${ru}" : "${en}"}</li>`);
    // Or if it's strictly just inside <li>
    c = c.replace(`<li>${en}</li>`, `<li>{i18n.language === "ru" ? "${ru}" : "${en}"}</li>`);
}

fs.writeFileSync('src/App.tsx', c);
console.log('Fixed more text');
