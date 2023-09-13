const { verifyPath, pathExists, checkPathType, verifyMarkdown, readFileMarkdown, extractLink, } = require('./data');

function mdLinks(pathFile) {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta es absoluta
    let absolutePath = verifyPath(pathFile);
    // Identificar si la ruta existe  
    pathExists(absolutePath)
      .then(((() => checkPathType(absolutePath))))// Verificar si es un archivo o directorio */
      .then(((files) => verifyMarkdown(files))) //Verifica si la ruta es .md*/
      .then(((files) => readFileMarkdown(files))) //lee la ruta 
      .then((data) => {
        const linkObjects = extractLink(data, pathFile);
        // Devuelve los enlaces extraídos como parte de la promesa resuelta
        resolve(linkObjects)
          .catch(reject);
      });
  });
}


/*mdLinks('C:/Users/LENOVO/Documents/LABORATORIA/DEV009-md-links/test/prueba.md') */

module.exports = { mdLinks }
