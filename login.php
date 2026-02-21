<?php
require_once "database.php"
$username = $_POST["username"];
$password = $_POST["password"]:

   $pdo = Database::getInstance()->getConnection();
    $stmt = $pdo->prepare("SELECT * FROM utenti WHERE username = :username");
    $stmt->execute(['username' => $_POST['username']]);
    $utente = $stmt->fetch();

     if($utente && password_verify($_POST['password'], $utente['password'])){
            $header = {
                "alg": "HS256",
                "typ": "JWT"
            }
            $base64Header = base64Encode($header)
            $payload = {
                "userId": 1,
                "username": "fabio",
                "role" : "user"
            }
            $base64Payload = base64Encode($payload)
            $signature = HS256($base64Header + '.' + $base64Payload, 'secret')
            $Token = $base64Header + "."+ $base64Payload + "." + $signature
    } else{
        $errore = "Credenziali errate";
    }

?>