

export function generarBracket(equipos) {
    // Calcula la potencia de dos más cercana hacia arriba
    let potencia = Math.ceil(Math.log(equipos.length) / Math.log(2));
    let numPosiciones = Math.pow(2, potencia);

    // Crea el primer nivel del bracket
    let primerNivel = [];
    for (let i = 0; i < numPosiciones; i++) {
        if (i < equipos.length) {
            primerNivel.push({ name: equipos[i], result: 0 });
        } else {
            primerNivel.push({ name: '--------', result: 0 });
        }
    }

    // Crea el resto de los niveles del bracket
    let bracket = [primerNivel];
    let nivelActual = primerNivel;
    while (nivelActual.length > 1) {
        let siguienteNivel = [];
        for (let i = 0; i < nivelActual.length / 2; i++) {
            siguienteNivel.push({ name: '--------', result: 0 });
        }
        bracket.push(siguienteNivel);
        nivelActual = siguienteNivel;
    }

    // Cambia el nombre del último elemento a "Ganador"
    bracket[bracket.length - 1][0].name = 'Ganador';

    return bracket;

}
/* let arreglo = ['Equipo1', 'Equipo2', 'Equipo3', 'Equipo4', 'Equipo5', 'Equipo6','Equipo7','Equipo8','Equipo9','Equipo10'];
let resultado = generarBracket(arreglo);
console.log(resultado); */

