<?php
require_once 'config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $db->query('SELECT * FROM contacts ORDER BY created_at DESC');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare('INSERT INTO contacts (nom, email, sujet, message) VALUES (?, ?, ?, ?)');
        $stmt->execute([
            $data['nom'],
            $data['email'],
            $data['sujet'] ?? null,
            $data['message']
        ]);
        echo json_encode(['id' => $db->lastInsertId()]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'])) {
            $stmt = $db->prepare('UPDATE contacts SET lu = ? WHERE id = ?');
            $stmt->execute([$data['lu'] ?? false, $data['id']]);
            echo json_encode(['success' => true]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $db->prepare('DELETE FROM contacts WHERE id = ?');
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        }
        break;
}
