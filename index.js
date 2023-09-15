const { verifyPath, pathExists, checkPathType, verifyMarkdown, readFileMarkdown, extractLink, validateLinks } = require('./data');

function mdLinks(pathFile, options) {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta es absoluta
    let absolutePath = verifyPath(pathFile);
    // Identificar si la ruta existe  
    pathExists(absolutePath)
      .then(((() => checkPathType(absolutePath))))// Verificar si es un archivo o directorio */
      .then(((files) => verifyMarkdown(files))) //Verifica si la ruta es .md*/
      .then(((files) => readFileMarkdown(files))) //lee la ruta        
      .then((data) => {
        const links = extractLink(data, pathFile);
        // Devuelve los enlaces extraídos como parte de la promesa resuelta
        if (options !== true) {
          // Si options es true, entonces validamos los enlaces
          return validateLinks(links);
        } else {
          // Si options.validate es false o no está definido, resolvemos los enlaces sin validar
          return links;
        }
      })
      .then((result) => {
        // Devolvemos los enlaces (validados o no) como parte de la promesa resuelta
        resolve(result);
      })
      .catch(reject);
  });
}



/*mdLinks('C:/Users/LENOVO/Documents/LABORATORIA/DEV009-md-links/test/prueba.md') */

module.exports = { mdLinks }
