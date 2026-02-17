const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (!['node_modules', '.git', 'build-scripts'].includes(file)) {
                processDirectory(filePath);
            }
        } else if (file.endsWith('.js')) {
            removeJSComments(filePath);
        }
    });
}

function removeJSComments(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remover comentarios de línea // ...
        content = content.replace(/\/\/.*$/gm, '');
        
        // Remover comentarios de bloque /* ... */
        content = content.replace(/\/\*[\s\S]*?\*\//g, '');
        
        // Remover líneas vacías múltiples
        content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
        
        // Limpiar espacios extra
        content = content.split('\n')
            .map(line => line.trimEnd())
            .join('\n');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Comentarios removidos de: ${filePath}`);
    } catch (error) {
        console.error(`✗ Error procesando ${filePath}:`, error.message);
    }
}

const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
    console.log('🧹 Removiendo comentarios JavaScript...\n');
    processDirectory(distPath);
    console.log('\n✅ Proceso completado!');
} else {
    console.error('❌ Carpeta dist no encontrada. Ejecuta "npm run copy:files" primero.');
}
