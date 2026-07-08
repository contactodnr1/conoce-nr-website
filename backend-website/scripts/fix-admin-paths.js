const fs = require('fs');
const path = '.strapi/client/index.html';

const content = fs.readFileSync(path, 'utf8');
const fixed = content.replace(/\\/g, '/');
fs.writeFileSync(path, fixed);