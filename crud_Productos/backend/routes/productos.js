const express = require("express");
const router = express.Router();
const pool = require("../db");

pool.connect()
.then(() => console.log("Conectado a PostgreSQL"))
.catch(err => console.error("Error conectando a PostgreSQL:", err));



// Listar
router.get("/listar", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo productos" });
  }
});

// Crear
router.post("/add", async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;
    const result = await pool.query(
      "INSERT INTO productos (nombre, precio, categoria) VALUES ($1, $2, $3) RETURNING *",
      [nombre, precio, categoria]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creando producto" });
  }
});



// Actualizar
router.put("/update/:id", async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;
    const result = await pool.query(
      "UPDATE productos SET nombre=$1, precio=$2, categoria=$3 WHERE id=$4 RETURNING *",
      [nombre, precio, categoria, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error actualizando producto" });
  }
});

// Eliminar
router.delete("/delete/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM productos WHERE id=$1", [req.params.id]);
    res.json({ msg: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error eliminando producto" });
  }
});

module.exports = router;
