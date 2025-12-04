export const    Modulo1Page = () => {
 let saga: string = "Saiyan Saga"; //Inferido


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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2
                    text-neutral-300">
                        <div >
                           Saga: 
                          <span> {saga}</span>
                        </div>

                    </div>

                 </section>
            </div>
        </main>
    );
}; 