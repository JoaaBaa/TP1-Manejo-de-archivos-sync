const fs = require('fs');

/*leerArchivoComoString
Recibe la ruta del archivo que se quiere leer, y devuelve un único string con todo el contenido
del mismo.*/
function leerArchivoComoString() {
    try {
        let datos = fs.readFileSync('leerArchivoComoString.txt', 'utf-8');
        return datos;
    } catch (error) {
            return `Error al leer el archivo: ${error.message}`;
    }
}
console.log(leerArchivoComoString())

console.log('===========================================================================================')
/*escribirTextoEnArchivo
Recibe una ruta, un texto, y un flag, y graba ese texto en un archivo en la ruta dada. Si el
directorio es válido pero el archivo no existe, decide que hacer según el flag:
● Con el flag en true, crea el archivo y lo escribe.
● Con el flag en false, lanza el error “el archivo no existe”.*/
function escribirTextoEnArchivo(ruta, texto, flag) {
    try {
        if (!fs.existsSync(ruta) && !flag) {
            throw new Error('El archivo no existe.');
        }

        fs.writeFileSync(ruta, texto, 'utf-8');
        console.log('Contenido: '+ fs.readFileSync(ruta, 'utf-8'))

        return 'Texto escrito exitosamente en el archivo.';
    } catch (error) {
        return `Error al escribir en el archivo: ${error.message}`;
    }
}

// Ejemplo de uso
const rutaArchivoExistente = 'existente.txt';
const rutaArchivoCreado = 'creado.txt';

const texto = 'Modificado: ' + new Date().toLocaleDateString();
console.log('Escribiendo archivo')
console.log(escribirTextoEnArchivo(rutaArchivoExistente, texto, false));
console.log('Creando archivo')
console.log(escribirTextoEnArchivo(rutaArchivoCreado, texto, true));//Borrar el txt creado para volver a probar
console.log('===========================================================================================')
