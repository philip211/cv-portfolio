
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

app = app.replace(/\{i18n\.language === "en" \? "2\) Architecture for Fair Realtime" : "2\) \{i18n\.language === \\"en\\" \? \\"Architecture\\" : \\"Архитектура\\"\} под честный realtime"\}/g, 
"{i18n.language === \"en\" ? \"2) Architecture for Fair Realtime\" : \"2) Архитектура под честный realtime\"}");

fs.writeFileSync("src/App.tsx", app);
console.log("Fixed!");

