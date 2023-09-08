const {mdLinks} = require('./index.js');

mdLinks('README.md')
.then ((resolve)=>{
 console.log(resolve);
})
.catch((reject)=>{
    console.log(reject);
})