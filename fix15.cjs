const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(/Frontend Developer\s*<a/g, '{i18n.language === "ru" ? "Frontend Разработчик" : "Frontend Developer"}\n                  <a');
c = c.replace(/Starta Institute\s*<a/g, '{i18n.language === "ru" ? "Starta Institute" : "Starta Institute"}\n                  <a');
c = c.replace(/\/ Cinematic Cases/, '/ {i18n.language === "ru" ? "Детальные кейсы" : "Cinematic Cases"}');
c = c.replace(/SORT BY: IMPACT/, '{i18n.language === "ru" ? "СОРТИРОВКА: ВЛИЯНИЕ" : "SORT BY: IMPACT"}');
c = c.replace(/STATUS: ONLINE • READY FOR DEPLOYMENT/g, '{i18n.language === "ru" ? "СТАТУС: ОНЛАЙН • ГОТОВ К РАБОТЕ" : "STATUS: ONLINE • READY FOR DEPLOYMENT"}');

// Workflow translations
c = c.replace('Workflow Stack', '{i18n.language === "ru" ? "Стек" : "Workflow Stack"}');
c = c.replace('Output Generation:', '{i18n.language === "ru" ? "Генерация артефактов:" : "Output Generation:"}');

// Some footer labels
c = c.replace("If you need high-end frontend execution, predictable delivery, and a product-minded engineer, I'm ready to talk.", "{i18n.language === \"ru\" ? \"Если нужен качественный фронтенд, предсказуемая поставка и продуктово-ориентированный инженер — я готов к диалогу.\" : \"If you need high-end frontend execution, predictable delivery, and a product-minded engineer, I'm ready to talk.\"}");


fs.writeFileSync('src/App.tsx', c);
console.log('Fixed tags with regex');
