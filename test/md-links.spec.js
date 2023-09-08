const {mdLinks} = require('../index.js');



describe('mdLinks', () => {

  it('debe ser una función que resuelva una promesa', () => {
    expect (typeof mdLinks).toBe('function');
  })

  it ('debe rechazar cuando path no exista',() => {
    return mdLinks ('./nata/lab/noexiste.md').catch((error) =>{
      expect(error).toBe('La ruta no existe');
    })
  })
  


});
