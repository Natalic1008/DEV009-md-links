#!/usr/bin/env node

const {mdLinks} = require('./index.js');
const { statsValidate, statsLinks} = require('./data.js');
const c = require('ansi-colors');
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
        console.log(`URL: ${c.bold.blue(link.href)}`);
        console.log(`Texto: ${c.bold.yellow.italic(link.text.slice(0, 50))}`);
        if (options.validate) {
          if (link.statusText ==='OK'){
            console.log(`Status: ${c.bold.green(link.status)}`);
            console.log(`Mensaje: ${c.bold.green(link.statusText)}`);
          } else {
            console.log(`Status: ${c.bold.red(link.status)}`);
            console.log(`Mensaje: ${c.bold.red(link.statusText)}`);
          }
        }
        console.log(`File: ${c.bold.cyan(link.file)}\n`);
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });


