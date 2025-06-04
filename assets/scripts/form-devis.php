<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once('../../../../wp-load.php');

$response = [];

if($_POST['modal-devis'] && !empty($_POST['prenom'])){
    // $sent = "in form";
    // echo $sent;


    /* données */
    foreach ($_POST as $key => $value){
        $$key = addslashes($value);
    }
    $date = date("Y-m-d");
    $time = date("H:i:s");


    /* Enregistrer le post */
    $quotedata = array(
        'post_title'    => sanitize_text_field($_POST['prenom']) . " " . sanitize_text_field($_POST['nom']),
        'post_content'  => sanitize_text_field($_POST['message']),
        'post_status'   => 'publish',
        'post_author'   => sanitize_text_field($_POST['author_id']),
        'post_type'     => 'devis',
    );
    $post_id = wp_insert_post($quotedata);
    if (is_wp_error($post_id)) {
        // There was an error
        // echo 'Error: ' . $post_id->get_error_message();
        $response['status'] = 'error';
        $response['message'] = $post_id->get_error_message();
        echo json_encode($response);
    } else {
        // Add custom fields
        update_post_meta($post_id, 'email', sanitize_email($_POST['email']));
        update_post_meta($post_id, 'telephone', sanitize_text_field($_POST['telephone']));
        update_post_meta($post_id, 'type_de_travaux', sanitize_text_field($_POST['type_de_travaux']));
        update_post_meta($post_id, 'type_de_demande', sanitize_text_field($_POST['type_de_demande']));
        update_post_meta($post_id, 'code_postal', sanitize_text_field($_POST['code_postal']));
        update_post_meta($post_id, 'ville', sanitize_text_field($_POST['ville']));
    }


    /* connexion DB */
    if(strstr($_SERVER['SERVER_NAME'], 'localhost')){
        $servername = "localhost:3307";
        $username = "root";
        $password = "";
        $dbname = "trouver_mon_entrepreneur";
    }
    else{
        $servername = "ws65600-002.eu.clouddb.ovh.net:35331";
        $username = "simonwagneur";
        $password = "Liegemonarchs80";
        $dbname = "trouver-un-architecte";
    }


    /* insérer dans la DB */
    $con = mysqli_connect($servername,$username,$password,$dbname);
    mysqli_set_charset($con,"utf8");
    $result="INSERT INTO devis (nom, prenom, email, telephone, type_de_travaux, type_de_demande, message, code_postal, ville, date, heure)
    VALUES ('$nom','$prenom', '$email', '$telephone', '$type_de_travaux', '$type_de_demande', '$message', '$code_postal', '$ville', '$date', '$time')";
    if(!mysqli_query($con, $result)){ 
        $response['status'] = 'error';
        $response['message'] = mysqli_error($con);
        echo json_encode($response);
    }
    else{
        /* envoyer email */
        $from = $email;
        $to = "info@achyl.be, perso.dimitrigarnier@gmail.com";
        $subject = "Demande de devis - Trouver un architecte";
        $message_email =
        '
        Date: '.$date.'<br>
        Heure: '.$time.'<br>
        Nom: '.$prenom.' '.$nom.'<br>
        Téléphone: '.$telephone.'<br>
        Email: '.$email.'<br>
        Ville: '.$code_postal.' '.$ville.'<br>
        Type de travaux: '.$type_de_travaux.'<br>
        Type de demande: '.$type_de_demande.'<br>
        Message: '.$message.'<br>
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
    }
}

?>