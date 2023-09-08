const {verifyPath, pathExists} = require('./data');

function mdLinks(file){
  return new Promise ((resolve, reject) =>{
    // Identifica si la ruta es absoluta
    const absolutePath = verifyPath(file);
    // Identificar si la ruta existe  
    pathExists (absolutePath);
    if (!pathExists (absolutePath)){
      reject ("La ruta no existe");
    }
    // Verificar si es un archivo
      else {
      
      resolve ("La ruta existe");
    }
  })
    
  };



module.exports = { mdLinks }
