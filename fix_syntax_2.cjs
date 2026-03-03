const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// There are a lot of <SomeTag>{i18n.language === 'en' ? '...' : '...'}</SomeTag> 
// If they have nested tags, it breaks.
// The easiest fix is just restore the whole file as it was using Git history, if possible.
const cp = require('child_process');
try {
  cp.execSync('git checkout src/App.tsx');
  console.log('Restored with Git');
} catch(e) {
  console.log('Git checkout failed, maybe no changes or untracked');
}

