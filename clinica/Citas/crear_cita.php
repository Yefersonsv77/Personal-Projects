<?php

include ("../db.php");

//Crear cita

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");


//Crear Cita
$crearDatos = json_decode(file_get_contents("php://input"), true);

if(empty($crearDatos)){
    echo json_encode([
        "success" => false,
        "message" => "No se recibieron datos."
    ]);
    exit;
}

//Usar consultas preparadas para evitar inyecciones SQL
$paciente_id = intval($crearDatos['paciente_id']);
$fecha = trim($crearDatos['fecha']);
$hora = trim($crearDatos['hora']);
$odontologo = trim($crearDatos['odontologo']);
$estado = trim($crearDatos['estado']);

$stmt = $conexion->prepare("INSERT INTO citas (paciente_id, fecha, hora, odontologo, estado) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issss", $paciente_id, $fecha, $hora, $odontologo, $estado);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Cita creada correctamente.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al crear la cita: ' . $stmt->error
    ]);
}

//Cerrar la consulta y la conexión
$stmt->close();
$conexion->close();

?>