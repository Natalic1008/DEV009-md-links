const path = require('path');
const { verifyPath, pathExists, checkPathType, verifyMarkdown, extractLink, validateLinks, readDir, statsLinks, statsValidate } = require('../data.js')
const axios = require('axios');

jest.mock('axios');

const testPath = 'test/prueba.md'



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
      return expect(pathExists('test/directorio/prueba2.md')).resolves.toEqual('test/directorio/prueba2.md');
    });

    it('debería resolver con un error si la ruta no existe', () => {
      return expect(pathExists('./nonexistent.md')).rejects.toThrowError(Error('La ruta no existe'));
    });
  });

describe('checkPathType', () => {
  it('debería resolver con la ruta dada si es un archivo', () => {
    return checkPathType('README.md').then(file => {
      expect(file).toBe('README.md');
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

describe('validateLinks', () => {

  it('deberia resolver si el link es valido (status)', () => {
    jest.spyOn(axios, 'head').mockResolvedValue({ status: 200, statusText: 'OK' })
    const links = [
      { href: 'valid-example', text: 'Valid Link', file: 'valid.md' },
    ];

    return validateLinks(links)
      .then((results) => {
        expect(results).toEqual([
          {
            text: 'Valid Link',
            href: 'valid-example',
            file: 'valid.md',
            status: 200,
            statusText: 'OK',
          },
        ])
      })
  });

  it('deberia resolver si el link es invalido(status)', () => {
    axios.head.mockRejectedValue({ response: { status: 'no responde', statusText: 'fail' } })
    const links = [
      { href: 'invalid-example', text: 'Invalid Link', file: 'invalid.md' },
    ];

    return validateLinks(links)
      .then((results) => {
        expect(results).toEqual([
          {
            text: 'Invalid Link',
            href: 'invalid-example',
            file: 'invalid.md',
            status: 'no responde',
            statusText: 'fail',
          }
        ])
      })
  });

  describe('readDir', () => {

    it('retorna un array con los archivos del directorio', () => {
      expect(readDir('test/directorio')).toEqual([
        "test\\directorio\\prueba.md",
        "test\\directorio\\prueba2.md",
        "test\\directorio\\sinlink.htm",
        "test\\directorio\\subcarpeta\\prueba3.md",
      ])
    });

    it('retorna un array con los archivos de una subcarpeta', () => {
      expect(readDir('test/directorio/subcarpeta')).toEqual([
        "test\\directorio\\subcarpeta\\prueba3.md",
      ])
    })
    
  });

  describe('statsLinks and statsValidate', () => {
    const links = [
      { href: 'https://nodejs.org/', statusText: 'OK' },
      { href: 'https://nodejs.org/', statusText: 'OK' },
      { href: 'https://github.com/Laboratoria/bootcamp/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4', statusText: 'OK' },
      { href: 'https://es.wikipedia.org/wiki/Markdown1', statusText: 'fail' },
      { href: 'https://jestjs.io/1', statusText: 'fail' }
    ];
  
    it('Retorna el número total de links y el número de links únicos', () => {
      expect(statsLinks(links)).toEqual({ Total: 5, Unique: 4 });
    });
  
    it('Retorna el número de:links totales, links únicos y  links invalidos', () => {
      expect(statsValidate(links)).toEqual({ Total: 5, Unique: 4, Broken: 2 });
    });
  })  
})


