<?php
$title = $attributes['title'] ?? '';
$text = $attributes['text'] ?? '';
$imageUrl = $attributes['imageUrl'] ?? '';
$imageAlt = $attributes['imageAlt'] ?? '';
?>

<section class="section-hero2">
    <div class="container xlarge-container">
        <div class="section-hero2__content">
            <h1 class="section-hero2__title"><?php echo esc_html($title); ?></h1>
            <p class="section-hero2__text"><?php echo esc_html($text); ?></p>
            <?php echo $content; // Affiche le contenu de InnerBlocks ?>
        </div>
        
        <div class="section-hero2__banner">
        <?php if (!empty($imageUrl)) : ?>
            <img 
                src="<?php echo esc_url($imageUrl); ?>"
                alt="<?php echo esc_attr($imageAlt); ?>"
                class="section-hero2__image"
            />
        <?php endif; ?>
        </div>
        
    </div>
</section>