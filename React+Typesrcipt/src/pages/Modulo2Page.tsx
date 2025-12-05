export const Modulo2Page = () => {

    type Ingredientes = "agua" | "cafe" | "azucar";

    type RecetaCafe ={
        agua: number  
        cafe: number 
        azucar: number 
    };
    
    type CafePreparado = {
        mensaje: string;
        intensidad: "suave" | "fuerte";
    };

    function prepararCafe(receta: RecetaCafe): CafePreparado{
        const intensidad = receta.cafe > 10 ? "fuerte" : "suave";
        return {
            mensaje: `Café listo con ${receta.agua}ml de agua, ${receta.cafe}g de café ` +(receta.azucar ? `    + ${receta.azucar}g de azúcar` : 
                ""),
            intensidad,
        }
    };

    const OnCafe = ()=> {
        const resultado = prepararCafe({agua: 200, cafe: 15, azucar: 5});
        alert (resultado.mensaje);
    }
    
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <div className="mx-auto max-w-3xl p-8">
        <header className="mb-8 border-b border-neutral-800 pb-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-400">
            Módulo 2: Props y Estado
          </h1>
          <p className="text-sm text-neutral-400 py-4">
            Fundamentos: Props opcionales, defaults y  useState tipado.
          </p>
        </header>
        <section className="mb-8">
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg shadow-md px-2 py-2" onClick={OnCafe}>Preparar Café</button>

        </section>
      </div>
    </main>
  );
};
