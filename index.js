const { verifyPath, pathExists, checkPathType, verifyMarkdown, readFileMarkdown, extractLink, validateLinks, readDir } = require('./data');

function mdLinks(pathFile, options) {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta es absoluta
    let absolutePath = verifyPath(pathFile);
    // Identificar si la ruta existe  
    pathExists(absolutePath)
      .then(((() => checkPathType(absolutePath))))// Verificar si es un archivo o directorio */
      .then((file) => {
        let fileToRead = [];
        if (Array.isArray(file)) {
          fileToRead = readDir(absolutePath);
        } else if (verifyMarkdown(absolutePath)) {
          fileToRead.push(absolutePath);
        }
        return Promise.all(fileToRead.map((file) => readFileMarkdown(file)));
      })
      .then((data) => {
        const links = extractLink(data.join('\n'), pathFile);
        // Devuelve los enlaces extraídos como parte de la promesa resuelta
        if (options === true) {
          // Si options es true, entonces validamos los enlaces
          resolve(validateLinks(links)) ;
        } else {
          // Si options.validate es false o no está definido, resolvemos los enlaces sin validar
          resolve(links) ;
        }
      })
      /*.then((result) => {
        // Devolvemos los enlaces (validados o no) como parte de la promesa resuelta
        resolve(result);
      })*/
      .catch(reject);
  })
}

module.exports = { mdLinks }
