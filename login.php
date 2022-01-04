<?php
require_once './ecrecover.php';

$_POST = json_decode(file_get_contents("php://input"), true);

$walletHash = $_POST['walletHash'];
$signatureHash = $_POST['signatureHash'];
$messageHash = $_POST['messageHash'];

$verifyHash = personal_ecRecover($messageHash, $signatureHash);

if ($verifyHash == $walletHash) {
	//We've verified this is our user, do stuff.
} else {
	error_log("Incorrect signature and message hash, rejecting.", 0);
}

?>