const {mdLinks} = require('./index.js');


mdLinks('test/prueba.md', true)
.then ((resolve)=>{
 console.log(resolve);
})
.catch((reject)=>{
    console.log(reject);
})

