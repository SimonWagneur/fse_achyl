<?php
$imageUrl = $attributes['imageUrl'] ?? '';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-benefits2" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container">
        <div class="left">
            <div class="state"></div>
            <h2 class="h2"></h2>
            <p class="p"></p>
            <div class="controls">
                <div class="control prev disabled"><i class="fa-solid fa-arrow-left"></i></div>
                <div class="control next"><i class="fa-solid fa-arrow-right"></i></div>
            </div>
        </div>
        <div class="right">
            <div class="canvas">
                <img id="heroBackground" src="" alt="Background">
            </div>
        </div>
    </div>
    <div class="slides">
        <?php echo wp_kses_post($content); ?>
    </div>
</section>