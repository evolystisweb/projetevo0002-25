<?php
require_once 'config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $db->query('SELECT * FROM settings');
        $settings = [];
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $settings[$row['cle']] = $row['valeur'];
        }
        echo json_encode($settings);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        foreach ($data as $key => $value) {
            $stmt = $db->prepare('INSERT INTO settings (cle, valeur) VALUES (?, ?) ON DUPLICATE KEY UPDATE valeur = ?');
            $stmt->execute([$key, $value, $value]);
        }
        echo json_encode(['success' => true]);
        break;
}
