
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const mappings = [
  // Remaining texts
  ["5) Деплой и релиз", "5) Deploy & Release"],
  ["Проект упакован в инфраструктуру, которую можно масштабировать: Docker / Compose, Nginx как gateway, понятная структура сервисов.", "The project is packed into a scalable infrastructure: Docker / Compose, Nginx as a gateway, clear service structure."],
  ["И дальше — релиз в Telegram: пользователи заходят, создают комнаты, играют.", "And then — release in Telegram: users log in, create rooms, and play."],
  ["Техническая суть", "Technical Essence"],
  ["Realtime ядро", "Realtime Core"],
  ["Socket.io комнаты и события", "Socket.io rooms and events"],
  ["Синхронизация состояния между клиентами", "State synchronization across clients"],
  ["Контроль гонок/конфликтов", "Race-condition / conflict control"],
  ["Детерминированный resolver раундов", "Deterministic round resolver"],
  ["Frontend & UI", "Frontend & UI"],
  ["Telegram Mini Apps API", "Telegram Mini Apps API"],
  ["Framer Motion анимации", "Framer Motion animations"],
  ["Zustand store", "Zustand state"],
  ["Особенности", "Key Features"],
  ["Обработка обрывов соединения (реконнекты)", "Handling disconnects (reconnection)"],
  ["Приватные и публичные чаты в одной комнате", "Private and public chats in one room"],
  ["Защита от подмены ролей (безопасность стейта)", "Role spoofing protection (state security)"],
  ["Почему это сложно?", "Why is this hard?"],
  ["Мафия — игра, где важна строгая последовательность. Если один игрок отвалился, у другого моргнул интернет, а третий нажал кнопку дважды — игра не должна сломаться. Сервер должен корректно отработать все edge-cases, а клиент — плавно отрисовать изменения. Я построил систему, которая с этим справляется.", "Mafia is a game where strict sequence matters. If one player drops, another has a network blip, and a third clicks a button twice — the game must not break. The server must handle all edge-cases, and the client must smoothly render changes. I built a system that handles this."],

  ["Полный цикл разработки:", "Full Development Cycle:"],
  ["Проектирование БД и API контрактов", "DB design and API contracts"],
  ["Настройка CI/CD, Docker", "CI/CD setup, Docker"],
  ["Интеграция с Telegram API", "Telegram API integration"],
  ["Написание Frontend части", "Frontend implementation"],
  ["Отладка realtime логики", "Realtime logic debugging"]
];

for (const [ru, en] of mappings) {
  const cleanRu = ru.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`>\\s*${cleanRu}\\s*<`, "g");
  
  if (regex.test(app)) {
     app = app.replace(regex, `>{i18n.language === "en" ? "${en}" : "${ru}"}<`);
  } else {
     app = app.replace(ru, `{i18n.language === "en" ? "${en}" : "${ru}"}`);
  }
}

fs.writeFileSync("src/App.tsx", app);
console.log("Done");

