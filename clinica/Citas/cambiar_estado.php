<?php
include ("../db.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Obtener datos JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$id = $data['id'] ?? null;
$estadoActual = $data['estado'] ?? '';

if (!$id) {
    echo json_encode([
        'success' => false,
        'message' => 'ID de la cita requerido'
    ]);
    exit;
}

// Lógica para cambiar estado según el estado actual
$nuevoEstado = '';
switch (strtolower($estadoActual)) {
    case 'pendiente':
        $nuevoEstado = 'confirmada';
        break;
    case 'confirmada':
        $nuevoEstado = 'cancelada';
        break;
    case 'cancelada':
        $nuevoEstado = 'pendiente';
        break;
    default:
        $nuevoEstado = 'pendiente';
        break;
}

$stmt = $conexion->prepare("UPDATE citas SET estado = ? WHERE id = ?");
$stmt->bind_param("si", $nuevoEstado, $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode([
            'success' => true,
            'message' => "Estado cambiado a: $nuevoEstado"
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No se encontró la cita con ese ID'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al cambiar estado: ' . $conexion->error
    ]);
}

$stmt->close();
$conexion->close();
?>