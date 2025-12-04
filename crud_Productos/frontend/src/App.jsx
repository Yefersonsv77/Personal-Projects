import { useState, useEffect } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoria: ""
  });

  // Obtener productos
  const getProductos = async () => {
    const res = await fetch("http://localhost:3001/api/productos/listar");
    const data = await res.json();
    setProductos(data);
  };

  // Crear producto
  const crearProducto = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/api/productos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ nombre: "", precio: "", categoria: "" });
    getProductos();
  };

  // Editar producto
  const editarProducto = async (id, updatedProducto) => {
    await fetch(`http://localhost:3001/api/productos/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProducto)
    });
    getProductos();
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    await fetch(`http://localhost:3001/api/productos/${id}`, {
      method: "DELETE"
    });
    getProductos();
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        Crud para registrar Productos
      </h1>

      {/* Contenedor principal */}
      <div className="bg-white shadow-lg rounded-lg p-6 border">
        
        {/* Formulario */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Agregar Nuevo Producto
          </h2>
          
          <form onSubmit={crearProducto} className="space-y-3">
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />

            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
              placeholder="Precio"
              type="number"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
            />

            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
              placeholder="Categoría"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            />

            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors w-full">
              Crear Producto
            </button>
          </form>
        </div>

        {/* Línea separadora */}
        <hr className="my-6 border-gray-200" />

        {/* Lista de productos */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Lista de Productos ({productos.length})
          </h2>
          
          {productos.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No hay productos registrados
            </p>
          ) : (
            <ul className="space-y-3">
              {productos.map((p) => (
                <li
                  key={p.id}
                  className="border border-gray-200 p-3 flex justify-between items-center rounded hover:bg-gray-50 transition-colors"
                >
                  <span>
                    <strong className="text-gray-800">{p.nombre}</strong> — 
                    <span className="text-green-600 font-medium"> ${p.precio}</span> —  
                    <span className="text-sm text-gray-500"> {p.categoria}</span>
                  </span>
                  
                </li>
              ))}
            </ul>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default App;
