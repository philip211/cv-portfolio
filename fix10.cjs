const fs = require('fs');

let c = fs.readFileSync('src/i18n.ts', 'utf8');

// The block we want to extract
const startIdx = c.indexOf('"experience_edu": {\n      "title": "Опыт и Образование",');

if (startIdx !== -1) {
    // Backtrack 4 spaces to include the indent
    const blockStart = startIdx - 4;
    // Find the end of the block
    const blockEnd = c.indexOf('    },', startIdx) + 6;
    
    // The exact string to move
    const block = c.substring(blockStart, blockEnd);
    
    // Remove the block from its current location
    c = c.substring(0, blockStart) + c.substring(blockEnd);
    
    // Find where the Russian translation block starts
    const ruBlockIdx = c.indexOf('  ru: { translation: {');
    if (ruBlockIdx !== -1) {
        // Find the first "nav": { inside the Russian block
        const navRuIdx = c.indexOf('"nav": {', ruBlockIdx);
        
        if (navRuIdx !== -1) {
            // Insert it right there
            c = c.substring(0, navRuIdx) + block + '\n    ' + c.substring(navRuIdx);
            
            fs.writeFileSync('src/i18n.ts', c);
            console.log('Successfully fixed i18n.ts');
        } else {
            console.log('Could not find nav in ru block.');
        }
    } else {
        console.log('Could not find ru block.');
    }
} else {
    console.log('Could not find experience_edu block.');
}
