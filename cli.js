#!/usr/bin/env node

const {mdLinks} = require('./index.js');
const { statsValidate, statsLinks} = require('./data.js');
/*const process = require('node:process');*/
const path = process.argv[2];
//test/directorio
//test/directorio/prueba2.md
//test/directorio/sinlink.htm

const options = {
    validate: process.argv.includes('--validate'),
    stats: process.argv.includes('--stats'),
  };

  mdLinks(path, true)
  .then((links) => {
    
    if (options.validate && options.stats) {
        const stats = statsValidate(links);
        console.log(`Total: ${stats.Total}`);
        console.log(`Unique: ${stats.Unique}`);
        console.log(`Broken: ${stats.Broken}`);
      } else if (options.stats){
        const stats = statsLinks(links);
        console.log(`Total: ${stats.Total}`);
        console.log(`Unique: ${stats.Unique}`);
      } else {
      // Mostrar los enlaces (validados o no) como resultado
      links.forEach((link) => {
        console.log(`URL: ${link.href}`);
        console.log(`Texto: ${link.text.slice(0, 50)}`);
        if (options.validate) {
          console.log(`Status: ${link.status}`);
          console.log(`Mensaje: ${link.statusText}`);
        }
        console.log(`Archivo: ${link.file}\n`);
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });


