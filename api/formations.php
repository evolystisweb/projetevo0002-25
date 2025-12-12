<?php
require_once 'config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $db->query('SELECT * FROM formations WHERE visible = 1 ORDER BY ordre, created_at DESC');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare('INSERT INTO formations (titre, description, duree, prix, image_url, ordre, visible) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $data['titre'],
            $data['description'],
            $data['duree'] ?? null,
            $data['prix'] ?? null,
            $data['image_url'] ?? null,
            $data['ordre'] ?? 0,
            $data['visible'] ?? true
        ]);
        echo json_encode(['id' => $db->lastInsertId()]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare('UPDATE formations SET titre=?, description=?, duree=?, prix=?, image_url=?, ordre=?, visible=? WHERE id=?');
        $stmt->execute([
            $data['titre'],
            $data['description'],
            $data['duree'] ?? null,
            $data['prix'] ?? null,
            $data['image_url'] ?? null,
            $data['ordre'] ?? 0,
            $data['visible'] ?? true,
            $data['id']
        ]);
        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $db->prepare('DELETE FROM formations WHERE id = ?');
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        }
        break;
}
