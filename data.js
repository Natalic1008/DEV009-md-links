const pathModulo = require ('path');
const fs = require ('fs');

// Función para verificar si la ruta es absoluta, sino lo es convertir la ruta relativa en absoluta
function verifyPath(file) {
    return pathModulo.isAbsolute(file)?path:pathModulo.resolve(file);
}
// Función para verificar si la ruta existe
function pathExists(file) {
    return fs.existsSync(file);
}
// Función para determinar si la ruta es un archivo
function isFile(file) {
    return fs
      .stat(file)
      .then((stats) => {
        return stats.isFile();
      })
      .catch((error) => {
        console.error('Error al verificar si es un archivo:', error);
        return false
      });
    }
    // ------------> Verificación de archivo Markdown <-------------------
// Función que verifica si el archivo es markdown devolviendo un booleano
    const isMarkdownFile = (file) => {
    return path.extname(file) === '.md';
  }
  
  // Función para verificar si el archivo es de tipo Markdown devolviendo una promesa
  const verifyMarkdown = (file) => {
  if (!isMarkdownFile(file)) {
    return Promise.reject(new Error('El archivo no es Markdown (.md).'));
  }
  return Promise.resolve(path);
}
module.exports = { verifyPath, pathExists, isFile, verifyMarkdown }