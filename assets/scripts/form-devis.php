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

// Récupérer les valeurs sensibles depuis un fichier temporaire
$form_config = null;
if (isset($form_id) && !empty($form_id)) {
    $cache_file = dirname(__FILE__) . '/../cache/' . $form_id . '.json';
    if (file_exists($cache_file)) {
        $form_config = json_decode(file_get_contents($cache_file), true);
        // Supprimer le fichier après lecture
        unlink($cache_file);
    }
}

/* envoyer email */
$from = $email;
$to = ($form_config && isset($form_config['destination']) && !empty($form_config['destination'])) ? $form_config['destination'] : "info@achyl.be";
$subject = ($form_config && isset($form_config['objet']) && !empty($form_config['objet'])) ? $form_config['objet'] : "Demande de contact";

// Construire le message avec tous les champs
$message_email = '
Date: '.$date.'<br>
Heure: '.$time.'<br>
<br>
<strong>Informations du formulaire :</strong><br>
';

// Boucle sur tous les champs POST (sauf les champs techniques)
$excluded_fields = ['check', 'form_id', 'destination', 'objet'];
foreach ($_POST as $field_name => $field_value) {
    // Ignorer les champs techniques
    if (!in_array($field_name, $excluded_fields) && !empty($field_value)) {
        // Formater le nom du champ pour l'affichage
        $display_name = ucfirst(str_replace('_', ' ', $field_name));
        $message_email .= '<strong>'.$display_name.'</strong> : '.htmlspecialchars($field_value).'<br>';
    }
}

$headers  = "MIME-Version: 1.0 \n";
$headers .= "Content-type: text/html; charset=utf-8 \n";
$headers .= "From: ".$from."  \n";
$headers .= "Disposition-Notification-To: ".$from."  \n";
$CR_Mail = TRUE;
$CR_Mail = @mail ($to, $subject, $message_email, $headers);

$response['status'] = 'success';
$response['email'] = $email;
$response['form_id'] = $form_id ?? 'non défini';
$response['destination'] = $to;
$response['objet'] = $subject;
$response['form_config'] = $form_config;
echo json_encode($response);


// }

?>