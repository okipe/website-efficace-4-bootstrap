const fs = require('fs');
const path = require('path');

// Función recursiva para procesar archivos HTML
function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Ignorar node_modules y otras carpetas
            if (!['node_modules', '.git', 'build-scripts'].includes(file)) {
                processDirectory(filePath);
            }
        } else if (file.endsWith('.html')) {
            removeHTMLComments(filePath);
        }
    });
}

function removeHTMLComments(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remover comentarios HTML (incluyendo multilínea)
        // Preservar comentarios condicionales de IE
        content = content.replace(/<!--(?!\[if).*?-->/gs, '');
        
        // Remover líneas vacías múltiples
        content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Comentarios removidos de: ${filePath}`);
    } catch (error) {
        console.error(`✗ Error procesando ${filePath}:`, error.message);
    }
}

// Ejecutar desde la carpeta dist
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
    console.log('🧹 Removiendo comentarios HTML...\n');
    processDirectory(distPath);
    console.log('\n✅ Proceso completado!');
} else {
    console.error('❌ Carpeta dist no encontrada. Ejecuta "npm run copy:files" primero.');
}
