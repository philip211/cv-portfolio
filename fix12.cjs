const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

const reps = [
    {
        old: '<span>Engineering Deep Dive</span>',
        new: '<span>{i18n.language === "ru" ? "Глубокое погружение (Инженерия)" : "Engineering Deep Dive"}</span>'
    },
    {
        old: '<h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Projects</h2>',
        new: '<h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{i18n.language === "ru" ? "Проекты" : "Projects"}</h2>'
    },
    {
        old: '<h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Technology Stack</h2>',
        new: '<h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{i18n.language === "ru" ? "Технологический стек" : "Technology Stack"}</h2>'
    },
    {
        old: '<h3 className="text-lg font-bold text-white mb-4">Core (Daily)</h3>',
        new: '<h3 className="text-lg font-bold text-white mb-4">{i18n.language === "ru" ? "Основа (Ежедневно)" : "Core (Daily)"}</h3>'
    },
    {
        old: '<h3 className="text-lg font-bold text-white mb-4">UI / Product</h3>',
        new: '<h3 className="text-lg font-bold text-white mb-4">{i18n.language === "ru" ? "UI / Продукт" : "UI / Product"}</h3>'
    },
    {
        old: '<h3 className="text-lg font-bold text-white mb-4">Backend (Full-stack)</h3>',
        new: '<h3 className="text-lg font-bold text-white mb-4">{i18n.language === "ru" ? "Бэкенд (Full-stack)" : "Backend (Full-stack)"}</h3>'
    },
    {
        old: '<h3 className="text-lg font-bold text-white mb-4">Tooling / Engineering</h3>',
        new: '<h3 className="text-lg font-bold text-white mb-4">{i18n.language === "ru" ? "Инструменты / Инженерия" : "Tooling / Engineering"}</h3>'
    },
    {
        old: '<h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">\n                  Frontend Developer',
        new: '<h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">\n                  {i18n.language === "ru" ? "Frontend Разработчик" : "Frontend Developer"}'
    },
    {
        old: '<h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">\n                  Starta Institute',
        new: '<h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">\n                  {i18n.language === "ru" ? "Starta Institute (Институт)" : "Starta Institute"}'
    },
    {
        old: '<h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">AI Dev Pipeline</h2>',
        new: '<h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{i18n.language === "ru" ? "AI Pipeline Разработки" : "AI Dev Pipeline"}</h2>'
    },
    {
        old: '<h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">\n              Let\'s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">premium.</span>\n            </h2>',
        new: '<h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">\n              {i18n.language === "ru" ? "Давайте создадим что-то " : "Let\'s build something "} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{i18n.language === "ru" ? "премиальное." : "premium."}</span>\n            </h2>'
    }
];

let changed = 0;
reps.forEach(r => {
    if (c.includes(r.old)) {
        c = c.replace(r.old, r.new);
        changed++;
    } else {
        console.log("Could not find:", r.old);
    }
});

fs.writeFileSync('src/App.tsx', c);
console.log(`Fixed ${changed}/${reps.length} translations`);
