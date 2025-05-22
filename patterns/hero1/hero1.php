<?php
$heading = $attributes['heading'] ?? '';
$paragraph = $attributes['paragraph'] ?? '';
$imageUrl = $attributes['imageUrl'] ?? 'https://achyl.be/wp-content/themes/achyl/images/home_bg_1080.png';
?>

<section id="hero" class="hero">
  <div class="container medium-container">
    <div class="left">
      <?php if (!empty($heading)) : ?>
        <h1 class="h1"><?php echo wp_kses_post($heading); ?></h1>
      <?php endif; ?>

      <?php if (!empty($paragraph)) : ?>
        <p class="p"><?php echo wp_kses_post($paragraph); ?></p>
      <?php endif; ?>

      <?php echo $content; // InnerBlocks content ?>
    </div>

    <div class="right">
      <div class="visual-container">
        <img
          id="heroBackground"
          src="<?php echo esc_url($imageUrl); ?>"
          alt="Image sélectionnée"
        />
      </div>
    </div>
  </div>
</section>
