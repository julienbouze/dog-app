<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents("php://input");
    
    $formData = json_decode($postData, true);

    if ($formData !== null) {

        $dataFile = 'data/data.json';
        $currentData = json_decode(file_get_contents($dataFile), true);
        $currentData[] = $formData;
        file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT));

        http_response_code(200);
        echo 'Données enregistrées avec succès';
    } else {
        http_response_code(400);
        echo 'Erreur lors de la conversion JSON';
    }
} else {
    http_response_code(405);
    echo 'Méthode non autorisée';
}
?>
