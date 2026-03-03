const fs = require('fs');
let c = fs.readFileSync('src/App.tsx','utf8');
c = c.replace(/DevOps-агент собирает финальный чеклист перед слиянием с \main\ веткой\./g, '{i18n.language === "en" ? "DevOps agent collects the final checklist before merging to the main branch." : "DevOps-агент собирает финальный чеклист перед слиянием с main веткой."}');
fs.writeFileSync('src/App.tsx', c);
