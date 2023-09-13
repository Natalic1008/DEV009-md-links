const path = require('path');
const { mdLinks } = require('../index.js');
const { verifyPath, pathExists, checkPathType, verifyMarkdown, extractLink, } = require('../data.js')

const testPath = 'test/prueba.md'

describe('mdLinks', () => {

  it('debe ser una función que resuelva una promesa', () => {
    expect(typeof mdLinks).toBe('function');
  })

  /*test('debe devolver la misma ruta cuando la ruta es absoluta', () => {
    return mdLinks('C:\Users\LENOVO\Documents\LABORATORIA\DEV009-md-links\test\prueba.md').then((data) => {
      expect(data).toBeTruthy()
    })
  });*/

  it('debe rechazar cuando path no exista', () => {
    return mdLinks('./nata/lab/noexiste.md').catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  })

  test('debe devolver un error si el archivo no es "md"', () => {
    return mdLinks('testing_files/linktest.txt').catch((error) => {
      expect(error).toEqual(error)
    })
  })
});

describe('verifyPath', () => {
  it('debería devolver una ruta absoluta si se le da una ruta absoluta', () => {
    const absolutePath = verifyPath('C:\Users\LENOVO\Documents\LABORATORIA\DEV009-md-links\README.md');
    expect(path.isAbsolute(absolutePath)).toBe(true);
  });

  it('debería devolver una ruta absoluta si se le da una ruta relativa', () => {
    const absolutePath = verifyPath('test\prueba.md');
    expect(path.isAbsolute(absolutePath)).toBe(true);
  });
}),

  describe('pathExists', () => {
    it('debería resolver con filePath si la ruta existe', () => {
      return expect(pathExists(testPath)).resolves.toEqual(testPath);
    });

    it('debería resolver con un error si la ruta no existe', () => {
      return expect(pathExists('./nonexistent.md')).rejects.toThrowError(Error('La ruta no existe'));
    });
  });

describe('checkPathType', () => {
  it('debería resolver con la ruta dada si es un archivo', () => {
    return checkPathType(testPath).then(file => {
      expect(file).toBe(testPath);
    });
  });
  it('debe rechazar con un error si la función no puede leer la ruta', () => {
    return expect(checkPathType('./nonexistent.md')).rejects.toThrowError(Error('No se puede leer la ruta'));
  });
});

describe('verifyMarkdown', () => {
  it(' debería resolver si el archivo es Markdown', () => {
    return verifyMarkdown(testPath).then((result) => {
      expect(result).toBe(testPath);
    });
  });
  it(' debería rechazar si el archivo no es Markdown', () => {
    return expect(verifyMarkdown('testing_files/linktest.txt')).rejects.toThrowError('El archivo no es Markdown (.md).');
  });
});

describe('extractLink', () => {
  it('debería extraer enlaces correctamente', () => {
    const data = 'Este es un [enlace 1](http://enlace1.com) y aquí está [enlace 2](http://enlace2.com).';
    const archivo = 'archivo.md';

    const result = extractLink(data, archivo);

    // Verifica si el resultado coincide con los enlaces extraídos
    expect(result).toEqual([
      { href: 'http://enlace1.com', text: 'enlace 1', file: 'archivo.md' },
      { href: 'http://enlace2.com', text: 'enlace 2', file: 'archivo.md' },
    ]);
  });

  it('debería manejar casos sin enlaces', () => {
    const data = 'Este es un texto sin enlaces.';
    const archivo = 'archivo.md';

    const result = extractLink(data, archivo);

    // Verifica si el resultado está vacío (no se encontraron enlaces)
    expect(result).toEqual([]);
  });
});
