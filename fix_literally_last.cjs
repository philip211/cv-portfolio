const fs = require('fs');
let content = fs.readFileSync('src/App.tsx','utf8');
const oldStr = '<p className="text-gray-300 mb-4 text-sm leading-relaxed">DevOps-агент собирает финальный чеклист перед слиянием с \main\ веткой.</p>';
const newStr = '{i18n.language === "en" ? <p className="text-gray-300 mb-4 text-sm leading-relaxed">DevOps agent collects the final checklist before merging to the \main\ branch.</p> : <p className="text-gray-300 mb-4 text-sm leading-relaxed">DevOps-агент собирает финальный чеклист перед слиянием с \main\ веткой.</p>}';

content = content.split(oldStr).join(newStr);
fs.writeFileSync('src/App.tsx', content);
