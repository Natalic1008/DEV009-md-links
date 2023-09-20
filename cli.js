const {mdLinks} = require('./index.js');


mdLinks('test/directorio', true)
.then ((resolve)=>{
 console.log(resolve);
})
.catch((reject)=>{
    console.log(reject);
})

