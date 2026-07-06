const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('C:/Users/hasan/.gemini/antigravity/scratch/kompario-id/frontend/src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let updated = false;
    
    // Replace "http://localhost:8080/api..."
    if (content.includes('"http://localhost:8080')) {
        content = content.replace(/"http:\/\/localhost:8080([^"]*)"/g, '`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}$1`');
        updated = true;
    }
    
    // Replace `http://localhost:8080/api...`
    if (content.includes('`http://localhost:8080')) {
        content = content.replace(/`http:\/\/localhost:8080([^`]*)`/g, '`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}$1`');
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(file, content);
        console.log('Updated: ' + file);
    }
});
