<?php

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'));

if ($method != 'POST') {
    die('Method is not supported');
}

//TODO: authentication check
//TODO: input parameters validation

$fileName = './../'.$input->{'fileName'}.'.html';
$fileContent = $input->{'fileContent'};

file_put_contents($fileName, $fileContent);

?>