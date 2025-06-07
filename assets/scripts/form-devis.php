<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$response = [];

// if($_POST['modal-devis'] && !empty($_POST['prenom'])){
    // $sent = "in form";
    // echo $sent;


/* données */
foreach ($_POST as $key => $value){
    $$key = addslashes($value);
}
$date = date("Y-m-d");
$time = date("H:i:s");


/* envoyer email */
$from = $email;
$to = "info@achyl.be";
$subject = "Demande de contact";
$message_email =
'
Date: '.$date.'<br>
Heure: '.$time.'<br>

';
$headers  = "MIME-Version: 1.0 \n";
$headers .= "Content-type: text/html; charset=utf-8 \n";
$headers .= "From: ".$from."  \n";
$headers .= "Disposition-Notification-To: ".$from."  \n";
$CR_Mail = TRUE;
$CR_Mail = @mail ($to, $subject, $message_email, $headers);


$response['status'] = 'success';
$response['email'] = $email;
echo json_encode($response);


// }

?>