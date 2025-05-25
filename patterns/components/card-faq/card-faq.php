<?php
$title = $attributes['title'] ?? "Combien coûte la création d'un site ?";
$content = $attributes['content'] ?? "Les prix pour un site vitrine commencent à 1990€. Pour un site e-commerce, les prix commencent à 2990€. Après un appel découverte, nous réalisons un audit pour vous proposer un devis clair et adapté, sans frais cachés.";
?>

<div class="card-faq">
    <div class="top">
        <h3 class="h3"><?php echo wp_kses_post($title); ?></h3>
        <i class="fa-solid fa-plus" aria-hidden="true"></i>
    </div>
    <p style="display: block;"><?php echo wp_kses_post($content); ?></p>
</div>