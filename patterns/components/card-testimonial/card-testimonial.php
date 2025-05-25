<?php

$testimonialContent = $attributes['testimonialContent'] ?? 'Votre témoignage';
$authorName = $attributes['authorName'] ?? 'Nom de la personne';
$authorRole = $attributes['authorRole'] ?? 'Fonction de la personne';
?>


<div class="slide card-testimonial">
    <div class="upper">
        <div class="quote">
            <i class="fa-solid fa-quote-right" aria-hidden="true"></i>
        </div>
        <div class="stars">
            <i class="fa-solid fa-star" aria-hidden="true"></i>
            <i class="fa-solid fa-star" aria-hidden="true"></i>
            <i class="fa-solid fa-star" aria-hidden="true"></i>
            <i class="fa-solid fa-star" aria-hidden="true"></i>
            <i class="fa-solid fa-star" aria-hidden="true"></i>
        </div>
        <p class="p"><?php echo wp_kses_post($testimonialContent); ?></p>
    </div>
    <div class="credits">
        <div class="nom"><?php echo wp_kses_post($authorName); ?></div>
        <div class="fonction"><?php echo wp_kses_post($authorRole); ?></div>
    </div>
</div>