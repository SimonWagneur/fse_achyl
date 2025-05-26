<?php
$heading = $attributes['heading'] ?? 'Titre de la section';
$paragraph = $attributes['paragraph'] ?? 'Contenu de la section';
$imageUrl = $attributes['imageUrl'] ?? 'https://achyl.be/wp-content/themes/achyl/images/home_bg_1080.png';
$reversed = isset($attributes['reversed']) && $attributes['reversed'] ? 'reversed' : '';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-benefits1 <?php echo esc_attr($reversed); ?>" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container">
        <div class="left">
            <h2 class="h2"><?php echo esc_html($heading); ?></h2>
            <p class="p"><?php echo esc_html($paragraph); ?></p>
            <div class="buttons">
                <?php echo wp_kses_post($content); ?>
            </div>
        </div>
        <div class="right">
            <div class="canvas">
                <img id="heroBackground" src="<?php echo esc_url($imageUrl); ?>" alt="Background">
            </div>
        </div>
    </div>
</section>