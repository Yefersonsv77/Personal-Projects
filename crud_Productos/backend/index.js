const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


//rutas
app.use("/api/productos", require("./routes/productos"));

app.listen(3001, () => {
    console.log("Rutas de productos cargadas");
    console.log("Servidor corriendo en el puerto 3001");
});