import { Link } from "react-router-dom";

export const    HomePage = () => {
   
    const modules = [
        {
            id: 1,
            title: "Introducción a TypeScript en react",
            desc: "Tipos basicos, inferencia, arrays y tuplas.",
            path: "/modulo1"
        },
        {
            id: 2,
            title: "Props y Estado",
            desc: "Props opcionales, defaults y  useState tipado.",
            path: "/modulo2"
        },
    ];
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-100">
            <section className="mx-auto max-w-3xl px-6 py-12">
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl font-semibold text-blue-400">
                React + Typescript</h1> 
                <p className="text-sm text-neutral-400">
                    Navega por los modulos del curso.
                </p> 
            </header>
            <nav className="space-y-3">
                {modules.map((item) => (
                    <Link to={item.path} key={item.id} className="group block
                    rounded-xl border border-neutral-800 bg-neutral-800 px-5 py-4
                    transition hover:border-blue-400 hover:bg-neutral-900">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <span className="text-[10px] tracking-widest uppercase text-neutral-400">Módulo</span>
                                <h2 className="mt-1 text-lg font-medium text-neutral-100">{item.title}</h2>
                                <p className="text-sm text-neutral-400">{item.desc}</p>

                            </div>
                        </div>
                     </Link>   
                ))}
            </nav>
            </section>
   
        </main>
    );
}; 