const pathModulo = require('path');
const fs = require('fs');
const axios = require('axios');

// Función para verificar si la ruta es absoluta, sino lo es convertir la ruta relativa en absoluta
function verifyPath(file) {
  return pathModulo.isAbsolute(file) ? file : pathModulo.resolve(file);
}
// Función para verificar si la ruta existe
function pathExists(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err) => {
      if (err) {
        reject(new Error('La ruta no existe'));
      } else {
        resolve(file);
      }
    });
  });
}
// Función para determinar si la ruta es un archivo 
/*function isFile(file) {
    return fs
      .stat(file)
      .then((stats) => {
        return stats.isFile();
      })
      .catch((error) => {
        console.error('Error al verificar si es un archivo:', error);
        return false
      });
    }*/
// función para verificar si la ruta es un archivo o un directorio
function checkPathType(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) {
        reject(new Error('No se puede leer la ruta'));
      } else {
        resolve(stats.isFile() ? file : readDir(file));
      }
    });
  })
};
// Función que verifica si el archivo es markdown devolviendo un booleano
const isMarkdownFile = (file) => {
  return pathModulo.extname(file) === '.md';
}

// Función para verificar si el archivo es de tipo Markdown devolviendo una promesa
const verifyMarkdown = (file) => {
  if (!isMarkdownFile(file)) {
    return Promise.reject(new Error('El archivo no es Markdown (.md).'));
  }
  return Promise.resolve(file);
}
// Función para leer el contenido del archivo.md y retornar su contenido

function readFileMarkdown(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
// Función que busca y devuelve los enlaces encontrados en el contenido
// Recibe como parámetros 'data' (el contenido del archivo) 
const extractLink = (data, archivo) => {
  const regularExpression = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
  const links = [];
  let match;
  // Aquí comienza un bucle while que se ejecutará mientras encuentre coincidencias en el contenido.
  // La función exec() de la expresión regular busca coincidencias en el contenido.
  // Si encuentra una coincidencia, la asigna a la variable match y el bucle se ejecuta.
  // Si no encuentra más coincidencias, la función devuelve null y el bucle se detiene.
  while ((match = regularExpression.exec(data)) !== null) {
    links.push({ // Se agrega el enlace a la lista de enlaces links
      href: match[2],
      text: match[1],
      file: archivo,
    });
  }
  return links;
};

// Función que valida los enlaces encontrados
// Devuelve una promesa que se resolverá cuando todas las solicitudes de validación de los enlaces se completen
function validateLinks(links) {
  // Se crea un nuevo array para almacenar las solicitudes HTTP
  const validatePromises = links.map((link) => {
    // Se hace una solicitud HEAD a la URL del enlace y devuelve una promesa
    return axios.head(link.href)
      .then((response) => {
        // Cuando la solicitud se resuelve con éxito, se actualizan las propiedades del link
        return {
          text: link.text,
          href: link.href,
          file: link.file,
          status: response.status,
          statusText: response.statusText
        }
      })
      .catch((error) => {
        return {
          text: link.text,
          href: link.href,
          file: link.file,
          status: error.response ? error.response.status : "no responde", // Estado de la solicitud en caso de error
          statusText: 'fail' // Mensaje de error
        }
      })
  })
  // Retorna una nueva promesa que se resolverá cuando todas las solicitudes se completen
  return Promise.all(validatePromises);

};
//Función que lee el contenido de un directorio y devuelve arr con los archivos encontrados
function readDir(path, filesArr = []) {
  
  const files = fs.readdirSync(path);
  // fs.readdirSynca leer de manera síncrona el contenido del directorio y almacena los 
  //nombres de los archivos y subdirectorios en un array llamado files.

    files.forEach((file) => {
    
    const filePath = pathModulo.join(path, file);
    const stat = fs.statSync(filePath);

    // Comprueba si el elemento actual es un directorio.
    if (stat.isDirectory()) {
      readDir(filePath, filesArr); 
    } else {
      filesArr.push(filePath);
    }
  });
  
  console.log(filesArr);
  return filesArr;
}


module.exports = { verifyPath, pathExists, checkPathType, verifyMarkdown, readFileMarkdown, extractLink, validateLinks, readDir}