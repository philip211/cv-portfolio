const fs = require('fs');

function extractAndReplace(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Instead of raw string replacement mapping, let's just do a proper i18n approach for the modal contents
    // It's way cleaner and error-free to move these to i18n
    
    console.log("Not replaced yet. Must define dict.");
}
