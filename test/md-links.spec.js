const { mdLinks } = require('../index.js');


jest.mock('axios');

const testPath = 'test/directorio'

describe('mdLinks', () => {

  it('debe ser una función que resuelva una promesa', () => {
    expect(typeof mdLinks).toBe('function');
  })

  
  it('deria extraer link y valida los enlaces', () => {
    /*const opciones = { validate: true };*/
    
    return mdLinks(testPath, true)
      .then((link) => {
        expect(link).toStrictEqual([
          {
            "file": "test/directorio",
            "href": "https://es.wikipedia.org/wiki/Markdown",
            "status": 200,
            "statusText": "OK",
            "text": "Markdown",
          },
          {
            "file": "test/directorio",
            "href": "https://nodejs.org/",
            "status": 200,
            "statusText": "OK",
            "text": "Node.js",
          },
          {
            "file": "test/directorio",
            "href": "https://github.com/Laboratoria/bootcamp/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4",
            "status": 200,
            "statusText": "OK",
            "text": "md-links",
          },
          {
            "file": "test/directorio",
            "href": "https://docs.github.com/es/issues",
            "status": 200,
            "statusText": "OK",
            "text": "issues",
          },
          {
            "file": "test/directorio",
            "href": "https://docs.github.com/es/issues/using-labels-and-milestones-to-track-work/about-milestones",
            "status": 200,
            "statusText": "OK",
            "text": "milestones",
          },
          {
            "file": "test/directorio",
            "href": "https://jestjs.io/1",
            "status": 404,
            "statusText": "fail",
            "text": "Jest",
          },
          {
            "file": "test/directorio",
            "href": "https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fspromisesreadfilepath-options",
            "status": 200,
            "statusText": "OK",
            "text": "`readFile`",
          },
        ]);
      });
  });
  it('debería extraer links correctamente sin validar', () => {
    return mdLinks(testPath, false).then((result) => {
      expect(result).toEqual([
        {
          "file": "test/directorio",
          "href": "https://es.wikipedia.org/wiki/Markdown",
          "text": "Markdown",
        },
        {
          "file": "test/directorio",
          "href": "https://nodejs.org/",
          "text": "Node.js",
        },
        {
          "file": "test/directorio",
          "href": "https://github.com/Laboratoria/bootcamp/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4",
          "text": "md-links",
        },
        {
          "file": "test/directorio",
          "href": "https://docs.github.com/es/issues",
          "text": "issues",
        },
        {
          "file": "test/directorio",
          "href": "https://docs.github.com/es/issues/using-labels-and-milestones-to-track-work/about-milestones",
          "text": "milestones",
        },
        {
          "file": "test/directorio",
          "href": "https://jestjs.io/1",
          "text": "Jest",
        },
        {
          "file": "test/directorio",
          "href": "https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fspromisesreadfilepath-options",
          "text": "`readFile`",
        },
      ]);
    })
  })
});

