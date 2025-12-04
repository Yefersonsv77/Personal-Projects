import { Link } from "react-router-dom";
import { CalcularDanio } from "../utils/CalcularDanio";

export const Modulo1Page = () => {
  //1) Inferencia vs anotaciuon
  let saga: string = "Saiyan Saga"; //Inferido
  let entrenamiento: number = 36; //Anotado

  //2) Tipos basicos
  let guerrero: string = "Goku"; //string
  const ki: number = 9001; //Enteros o decimales
  const enCombate: boolean = true; //boolean

  //3) Arrays
  const equipoZ: string[] = ["Goku", "Vegeta", "Gohan", "Piccolo"]; //Array de strings

  //4) Tuplas
  const coordenadas: [number, number, string] = [10, 20, "Calle neilbohud"]; //Tupla de dos numeros

  /*5) Funciones tipadas (parametros + retorno)
  function calcularDanio(base: number, multiplicador: number): number {
    return base * multiplicador;
  }
    */

  /*Tambien se puede tipas asi
  const calcularDanioFlecha =(base: number, multiplicador: number): number =>{
    return base * multiplicador;
  }
  */

  //6) null y undefined
    let transformacion: string | null = null; //Puede ser string o null
    transformacion = "Super Saiyan";
    let estrategia : string | undefined = undefined; //Puede ser string o undefined
    estrategia = "Transformarse a ultra instinto"; 

    //7) Tipo any y unknown
    let variableLibre: any = "Semilla de ermitaño"; //Tipo any
    variableLibre = 12; //Puede cambiar a cualquier tipo
    let evento : unknown = "refuerzo";
    let eventoMayus: string | null = null;
    if (typeof evento === "string"){
        eventoMayus= evento.toUpperCase(); 
    }


  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <div className="mx-auto max-w-3xl p-8">
        <header className="mb-8 border-b border-neutral-800 pb-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-400">
            Módulo 1: Introducción a TypeScript en React
          </h1>
          <p className="text-sm text-neutral-400 py-4">
            Fundamentos: Tipos basicos, inferencia, arrays y tuplas.
          </p>
        </header>
        <section className="mb-8">
          <h2 className="text-x1 font-medium text-blue-400 mb-2">
            Inferencia y basicos
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-2 text-neutral-300">
            <div> Saga: {saga}</div>
            <div>Horas de entrenamiento: {entrenamiento}</div>
            <div>Guerrero: {guerrero}</div>
            <div>Ki: {ki}</div>
            <div>En Combate: {enCombate ? "Si" : "No"}</div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-x1 font-medium text-blue-400 mb-2">Arrays</h2>
          <div>Equipo Z: {equipoZ.join(", ")}</div>
        </section>
        <section className="mb-8">
          <h2 className="text-x1 font-medium text-blue-400 mb-2">Tuplas</h2>
          <div>
            Coordenadas [x,y, calle] : x={coordenadas[0]}, y={coordenadas[1]},
            calle={coordenadas[2]}
          </div>
        </section>
        <section className="mb-8">
            <h2 className="text-x1 font-medium text-blue-400 mb-2">
                Funciones tipadas
            </h2>
            <div>
                <p>Danio (base 450 x mult. 2)</p>
                <span>{CalcularDanio(450, 2) }</span>
            </div>
        </section>
        <section className="mb-8">
            <h2 className="text-x1 font-medium text-blue-400 mb-2">
                Any y unknown
            </h2>
            <div>
                Any: {variableLibre}
            </div>
            <div>Evento: {eventoMayus}</div>
        </section>

        <div>
             <Link
            to="/"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md "
          >
            Volver a home
            </Link>
        </div>
      </div>
    </main>
  );
};
