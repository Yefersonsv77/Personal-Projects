<?php

include ("../db.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Crear paciente
$crearDatos = json_decode(file_get_contents("php://input"), true);

// Los datos vienen directamente, no envueltos en 'paciente'
$nombre = trim($crearDatos['nombre'] ?? '');
$documento = trim($crearDatos['documento'] ?? '');
$telefono = trim($crearDatos['telefono'] ?? '');
$correo = trim($crearDatos['correo'] ?? '');

if(empty($nombre) || empty($documento) || empty($telefono) || empty($correo)){
    echo json_encode([
        "success" => false,
        "message" => "Todos los campos son obligatorios."
    ]);
    exit;
}

//Usar consultas preparadas para evitar inyecciones SQL
$stmt = $conexion->prepare("INSERT INTO pacientes (nombre, documento, telefono, correo) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nombre, $documento, $telefono, $correo);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Paciente creado correctamente.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al crear el paciente: ' . $stmt->error
    ]);
}

$stmt->close();
$conexion->close();
?>