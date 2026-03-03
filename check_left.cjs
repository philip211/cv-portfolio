const fs = require('fs');
const f = fs.readFileSync('src/App.tsx','utf8');
let left=0;
f.split('\n').forEach((l,i)=>{
    if(/[А-Яа-яЁё]/.test(l) && !l.includes('i18n.language ===')) {
        left++;
        console.log((i+1), l.trim());
    }
});
console.log('Total left:', left);
