<?php
$title = $attributes['title'] ?? 'FAQ';
?>

<section id="faq" class="section-faq">
    <div class="container small-container">
        <h2 class="h2"><?php echo wp_kses_post($title); ?></h2>
        <?php echo wp_kses_post($content); // Contenu de InnerBlocks ?>
    </div>
</section>