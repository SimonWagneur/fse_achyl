<?php
$title = $attributes['title'] ?? '';
$text = $attributes['text'] ?? '';
$imageUrl = $attributes['imageUrl'] ?? '';
$imageAlt = $attributes['imageAlt'] ?? '';
?>

<section class="section-hero3 hero">
  <div class="container xlarge-container">
    <div class="upper">
      <h1><?php echo wp_kses_post($title); ?></h1>
      <div class="right">
        <p><?php echo wp_kses_post($text); ?></p>
        <?php echo $content; // Affiche le contenu de InnerBlocks ?>
      </div>
    </div>
    <div class="lower">
      <?php if (!empty($imageUrl)) : ?>
          <img 
              src="<?php echo esc_url($imageUrl); ?>"
              alt="<?php echo esc_attr($imageAlt); ?>"
              class="section-hero3__image"
          />
      <?php endif; ?>
    </div>
  </div>
</section>
