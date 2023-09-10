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
console.log(escribirTextoEnArchivo(rutaArchivoCreado, texto, true));//Borrar el txt "creado" para volver a probar
console.log('===========================================================================================')

/*
transformarStringEnArrayDeNumeros 
Recibe un texto y una secuencia de caracteres que usará como separador. Devuelve un array 
con todos los números producto de partir el texto cada vez que aparezca la secuencia 
separadora. En el caso de que alguna de las partes no sea numérica, no se incluirá en el 
resultado, pero no debe lanzar ningún error. 
Ejemplo 
Input: texto = ​‘123 | 456 | 789 | 1bc | 10’​ , separador = ​‘ | ’ 
Output: ​[123, 456, 789, 10]
*/
function transformarStringEnArrayDeNumeros(texto, separador) {
    const partes = texto.split(separador);
    const numeros = [];

    for (const parte of partes) {
        const numero = parseFloat(parte.trim());
        if (!isNaN(numero)) {
            numeros.push(numero);
        }
    }

    return numeros;
}

const stringToConvert = '123 | 456 | 789 | 1bc | 10';
const separador = ' | ';// idealmente usaría un separador de un caracter para no ver los espacios y el trim se encargaria de ellos en caso de haberlos.
console.log("Input: " + stringToConvert);
const resultado = transformarStringEnArrayDeNumeros(stringToConvert, separador);
console.log("output: " + resultado);
console.log(resultado);
console.log('===========================================================================================')
/*
transformarArrayDeNumerosAUnSoloString 
Recibe un array con strings, y una secuencia de caracteres para usar como separador. 
Devuelve un único string que es la unión de todos los strings del array, intercalando la 
secuencia separadora entre cada uno. 
Ejemplo 
Input: array = ​[123, 456, 789, 10]​ , separador = ​‘,’ 
Output: ​‘123,456,789,10’
*/
function transformarArrayDeNumerosAUnSoloString(array, separador) {
    // Usamos el método join() para unir los elementos del array con el separador
    return array.join(separador);
}

// Ejemplo de uso
const arrayDeStrings = ['123', '456', '789', '10'];
const separador2 = ',';
console.log("Input: " + arrayDeStrings);
console.log(arrayDeStrings);
const resultado2 = transformarArrayDeNumerosAUnSoloString(arrayDeStrings, separador2);
console.log("output: " + resultado2);
console.log(resultado2);
console.log('===========================================================================================')
/*
combinarDosArrays                                                                           NEGRO TENIA QUE PENSARLO SACANDO DE ARCHIVOS DE TEXTO???? WTFF
Recibe dos arrays, ambos con datos de tipo numérico, ambos ​ordenados​ en forma ascendente, 
y sin repetidos dentro de cada archivo (puede haber repetidos entre un archivo y otro). 
Devuelve un nuevo array, que contenga todos los datos de ambos arrays, también ​ordenados 
en forma ascendente, y también sin repetidos. 
Ejemplo 
Input: array1 = ​[1, 5, 10]​ , array2 = ​[2, 3, 8, 11] 
Output: ​[1, 2, 3, 5, 8, 10, 11]
*/

function combinarDosArrays(array1, array2) {
    let resultado = [];
    let indice1 = 0;
    let indice2 = 0;
    
    while (indice1 < array1.length && indice2 < array2.length) {
        if (array1[indice1] < array2[indice2]) {
            resultado.push(array1[indice1])
            indice1++
        } else if (array1[indice1] == array2[indice2]){ //si son iguales avanzamos ambos indices y pusheamos cualquiera de los dos
            resultado.push(array1[indice1])
            indice1++
            indice2++
        } else {
            resultado.push(array2[indice2])
            indice2++
        }
    }
    //Si salgo del while, al menos un array quedó vacío, por lo tanto uno de estos whiles no se va a ejecutar, el otro asigna los elementos restantes.
    while (indice1 < array1.length) {
        resultado.push(array1[indice1])
        indice1++;
    }

    while (indice2 < array2.length) {
        resultado.push(array2[indice2])
        indice2++;
    }
    return resultado
}

const combinado1 = [1, 5, 10]
const combinado2 = [2, 3, 8, 11]
console.log("Input1: " + combinado1);
console.log(combinado1);
console.log("Input1: " + combinado2);
console.log(combinado2);
const resultado3 = combinarDosArrays(combinado1, combinado2);
console.log("output: " + resultado3);
console.log(resultado3);
console.log('===========================================================================================')
/*
combinarNArrays 
Igual que la función anterior, solo que ésta recibe un array de arrays de números ordenados en 
forma ascendente y sin repetidos, y devuelve un nuevo array, con la combinación de todos los 
números de todos los arrays recibidos, también ​ordenados​ en forma ascendente, y también sin 
repetidos. 
Ejemplo
Input: arrays = ​[[1, 10],​ ​[2, 3, 15, 16],​ ​[4], [6, 7, 13]] 
Output: ​[1, 2, 3, 4, 6, 7, 10, 13, 15, 16]
*/
function combinarNArrays (arrays) {

    if(arrays.length == 0) {
        return []
    } else if (arrays.length == 1) {
        return arrays[0]
    }

    let arrayFinal = []
    let arrayIndex = 0;//Voy a comenzar a operar en los arrays cuando sean 2 o más elementos.
    while(arrayIndex < arrays.length) { //Mientras tenga 2 elementos, puedo usar la función anterior la idea sería fusionarlos hasta que no queden más
        arrayFinal = combinarDosArrays(arrayFinal, arrays[arrayIndex]);
        arrayIndex++
    }
    return arrayFinal
}
const arrays = [[1, 10], [2, 3, 15, 16], [4], [6, 7, 13]];
console.log("Input: " + arrays);
console.log(arrays);
const combinados = combinarNArrays(arrays)
console.log("Output: " + combinados);
console.log(combinados);