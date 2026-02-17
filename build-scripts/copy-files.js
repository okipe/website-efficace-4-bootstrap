const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '..');
const destDir = path.join(__dirname, '..', 'dist');

// Carpetas y archivos a EXCLUIR
const excludeList = [
  'node_modules',
  'dist',
  '.git',
  '.github',
  'build-scripts',
  'package.json',
  'package-lock.json',
  '.gitignore',
  'README.md',
  'readme-files',
  'efficace - bootstrap.code-workspace'
];

console.log('📦 Iniciando copia de archivos...');
console.log(`📂 Origen: ${sourceDir}`);
console.log(`📁 Destino: ${destDir}`);

try {
  // Limpiar carpeta dist si existe
  if (fs.existsSync(destDir)) {
    console.log('🧹 Limpiando carpeta dist existente...');
    fs.removeSync(destDir);
  }

  // Crear la carpeta dist
  console.log('📁 Creando carpeta dist...');
  fs.ensureDirSync(destDir);

  // Leer contenido del directorio raíz
  console.log('📋 Leyendo archivos del directorio...');
  const items = fs.readdirSync(sourceDir);
  
  let copiedCount = 0;
  let skippedCount = 0;

  // Copiar cada item individualmente
  items.forEach(item => {
    // Verificar si está en la lista de exclusión
    if (excludeList.includes(item)) {
      console.log(`⏭️  Saltando: ${item}`);
      skippedCount++;
      return;
    }

    const srcPath = path.join(sourceDir, item);
    const destPath = path.join(destDir, item);

    try {
      console.log(`📄 Copiando: ${item}`);
      fs.copySync(srcPath, destPath);
      copiedCount++;
    } catch (err) {
      console.error(`❌ Error copiando ${item}:`, err.message);
    }
  });

  console.log('\n✅ Proceso completado!');
  console.log(`📊 Estadísticas:`);
  console.log(`   ✓ Archivos/carpetas copiados: ${copiedCount}`);
  console.log(`   ⏭️  Archivos/carpetas omitidos: ${skippedCount}`);
  
  // Verificar que se creó la carpeta
  const distExists = fs.existsSync(destDir);
  console.log(`\n📂 Carpeta dist existe: ${distExists ? '✓' : '✗'}`);
  
  // Listar archivos copiados
  if (distExists) {
    const files = fs.readdirSync(destDir);
    console.log(`📝 Archivos en dist (${files.length} elementos):`);
    files.forEach(file => {
      const stats = fs.statSync(path.join(destDir, file));
      const type = stats.isDirectory() ? '📁' : '📄';
      console.log(`   ${type} ${file}`);
    });
  }

} catch (error) {
  console.error('❌ Error durante la copia:', error.message);
  process.exit(1);
}
