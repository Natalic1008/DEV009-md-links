# Markdown Links
![logo](/imagenes/mdlink.jpg)
## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Diagrama de flujon](#3-diagrama-de-flujo)
* [4. Instalación](#4-instalación)
* [5. Usos](#5-usos)
* [6.  Planificación](#6-planificación)

***

## 1. Preámbulo

MdLinks es una API en Node.js que hace que buscar y trabajar con enlaces en archivos Markdown sea fácil. Si utilizas archivos Markdown para enlazar recursos, mdLinks te ayuda a verificar, extraer información y hacer un seguimiento de esos enlaces de manera eficiente. Aprovecha esta herramienta para centrarte en tu contenido y dejar que mdLinks se encargue de tus enlaces en Markdown de forma rápida y sencilla.


## 2. Resumen del proyecto

Md-links es una herramienta de línea de comandos que hace que sea fácil extraer y analizar enlaces en archivos Markdown (.md). Su función principal es encontrar enlaces en archivos Markdown en un directorio o archivo específico y mostrar información relevante, como la URL, el texto asociado y el estado del enlace (válido o roto) cuando se realiza una validación.

Este proyecto realiza las siguientes tareas: 


1. Verifica si la ruta proporcionada existe
2. Identifica si La ruta proporcionada es absoluta o relativa; si llega a ser relativa la combierte en absoluta.
3. Determina si es un archivo o un directorio.
4. Lee y filtra archivos Markdown validos en del directorio o archivo especificado.
5. Extrae enlaces y su información asociada.
6. Opcionalmente, valida los enlaces mediante solicitudes HTTP.
7. Presenta los resultados en la consola, incluyendo URL, texto, archivo y estado del enlace.

En resumen, md-links simplifica el análisis y la validación de enlaces en archivos Markdown, facilitando a los usuarios mantener sus proyectos actualizados y con enlaces funcionales en su documentación.

## 3. Diagrama de flujo
Este diagrama de flujo ilustra el proceso paso a paso que ocurre una vez que se proporcione una ruta a md-links

![flujo1](/imagenes/Diagrama.png)

## 4. Instalación

Para instalar la API mdLinks, el usuario tiene las siguientes opciones:

 a. Instalación global
  1. Abre una terminal o línea de comandos en el proyecto donde deseas utilizar la API.
  2. Ejecuta el siguiente comando de npm para instalar la API desde npm:

* npm install -g https://github.com/Natalic1008/DEV009-md-links.git

 b. Instalación desde GitHub
  1. Abre una terminal o línea de comandos en el proyecto donde deseas utilizar la API.
  2. Ejecuta el siguiente comando de npm para instalar la API desde npm:
* npm install github:Natalic1008/DEV009-md-links 



## 5. Usos
Una vez que mdLinks esté instalado, puedes usarlo para analizar un archivo Markdown con el siguiente comando:

`md-links <path-to-file> [options]`

Donde:
* path-to-file : Es la ruta del archivo o directorio a analizar. 
* options : --validate (Verifica el estado de los enlaces encontrados)}
             --stats (Obtienes estadísticas de los enlaces encontrados).

 **Ejemplo**
 - `md-links /test/directorio

    ![extración](/imagenes/extraciónlinks.png)

- `md-links /test/directorio --validate
     
    ![validados](/imagenes/linkvalidados.png)

- `md-links /test/directorio --stats 

   ![estadistica](/imagenes/estadisticas.png)

- `md-links /test/directorio --stats --validate

   ![juntos](/imagenes/statsvalidate.png)

## 6. Planificación

La planificación de este proyecto se realizo en GitHub projects, en el cual se abrieron varios milestones que fuerón los diferentes hitos  y a su vez cada uno se dividieron en diferententes issues.

![gitprjects](/imagenes/gitprjects.png)

Cada vez que se completaba el issues correspondiente se cerraba por medio de un commit y así se veía el avance que llevaba cada hito.

![milestones](/imagenes/milestones.png)

