<?php

$method = $_SERVER['REQUEST_METHOD'];

if ($method != 'POST') {
    die('Method is not supported');
}

$apiKey = $_GET['api_key'];
if (empty($apiKey)) {
    die('You need to provide api_key to access this api.');
}

$masterKey = getenv('MasterApiKey');
if ($apiKey != $masterKey) {
    die('Your api_key is invalid.');
}

//TODO: input parameters validation

$input = json_decode(file_get_contents('php://input'));

$fileName = './../'.$input->{'fileName'}.'.html';
$fileContent = $input->{'fileContent'};

file_put_contents($fileName, $fileContent);

?>