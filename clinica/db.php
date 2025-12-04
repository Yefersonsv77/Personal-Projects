<?php
$servidor = "127.0.0.1";  // Sin el puerto aquí
$usuario = "root";
$contrasena = "";
$base_datos = "clinica_db";
$puerto = 33065; // Puerto por separado

// Create connection con puerto específico
$conexion = new mysqli($servidor, $usuario, $contrasena, $base_datos, $puerto);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Establecer charset
$conexion->set_charset("utf8");
?>