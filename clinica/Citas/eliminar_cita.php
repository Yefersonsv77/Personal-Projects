<?php
include ("../db.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");


//Eliminar paciente
$eliminarDatos1 = json_decode(file_get_contents('php://input'), true);

$id = intval($eliminarDatos1['id']);

if ($id <= 0) {

    echo json_encode([
        'success' => false,
        'message' => 'ID inválido.'
    ]);
    exit;
}

// Usar consulta preparada para evitar inyección SQL
$stmt = $conexion->prepare("DELETE FROM citas WHERE id = ?");
$stmt->bind_param("i", $id);
if($stmt->execute()){
    echo json_encode([
        'success' => true,
        'message' => 'Cita eliminada correctamente.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al eliminar la cita: ' . $conexion->error
    ]);
}




//Cerrar la consulta y la conexión
$stmt->close();
$conexion->close();

?>