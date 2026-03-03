const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace('What you get with me:', '{i18n.language === "ru" ? "Что вы получаете со мной:" : "What you get with me:"}');
c = c.replace('> No chaos. No spaghetti. Just clean systems and premium UX.', '> {i18n.language === "ru" ? "Никакого хаоса. Никакого спагетти-кода. Только чистые системы и премиальный UX." : "No chaos. No spaghetti. Just clean systems and premium UX."}');
c = c.replace('<span>System Architecture</span>', '<span>{i18n.language === "ru" ? "Системная архитектура" : "System Architecture"}</span>');
c = c.replace('Live Environment', '{i18n.language === "ru" ? "Работающая система" : "Live Environment"}');
c = c.replace("Full-stack visualization of the systems I build. I don't just write React components—I design the flow, handle real-time sync, and prepare for scale.", '{i18n.language === "ru" ? "Full-stack визуализация систем, которые я создаю. Я не просто пишу React-компоненты — я проектирую потоки данных, настраиваю real-time синхронизацию и закладываю фундамент для масштабирования." : "Full-stack visualization of the systems I build. I don\'t just write React components—I design the flow, handle real-time sync, and prepare for scale."}');

fs.writeFileSync('src/App.tsx', c);
console.log('Fixed texts');
