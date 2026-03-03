const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(
    'animate-pulse"></div> Core (Daily)',
    'animate-pulse"></div> {i18n.language === "ru" ? "Основа (Ежедневно)" : "Core (Daily)"}'
);

c = c.replace(
    'animate-pulse"></div> UI / Product',
    'animate-pulse"></div> {i18n.language === "ru" ? "UI / Продукт" : "UI / Product"}'
);

c = c.replace(
    'animate-pulse"></div> Backend (Full-stack)',
    'animate-pulse"></div> {i18n.language === "ru" ? "Бэкенд (Full-stack)" : "Backend (Full-stack)"}'
);

c = c.replace(
    'animate-pulse"></div> Tooling / Engineering',
    'animate-pulse"></div> {i18n.language === "ru" ? "Инструменты / Инженерия" : "Tooling / Engineering"}'
);

c = c.replace(
    'Frontend Developer\n                  <a',
    '{i18n.language === "ru" ? "Frontend Разработчик" : "Frontend Developer"}\n                  <a'
);

c = c.replace(
    'Starta Institute\n                  <a',
    '{i18n.language === "ru" ? "Starta Institute (Институт)" : "Starta Institute"}\n                  <a'
);

c = c.replace(
    `Let's build something <span`,
    `{i18n.language === "ru" ? "Давайте создадим что-то " : "Let's build something "}<span`
);

c = c.replace(
    `to-purple-500">premium.</span>`,
    `to-purple-500">{i18n.language === "ru" ? "премиальное." : "premium."}</span>`
);

fs.writeFileSync('src/App.tsx', c);
console.log('Fixed tags');
