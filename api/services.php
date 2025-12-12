<?php
require_once 'config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $db->query('SELECT * FROM services WHERE visible = 1 ORDER BY ordre, created_at DESC');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare('INSERT INTO services (titre, description, icone, ordre, visible) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([
            $data['titre'],
            $data['description'],
            $data['icone'] ?? null,
            $data['ordre'] ?? 0,
            $data['visible'] ?? true
        ]);
        echo json_encode(['id' => $db->lastInsertId()]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare('UPDATE services SET titre=?, description=?, icone=?, ordre=?, visible=? WHERE id=?');
        $stmt->execute([
            $data['titre'],
            $data['description'],
            $data['icone'] ?? null,
            $data['ordre'] ?? 0,
            $data['visible'] ?? true,
            $data['id']
        ]);
        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $db->prepare('DELETE FROM services WHERE id = ?');
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        }
        break;
}
