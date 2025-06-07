<?php
$anchor = $attributes['anchor'] ?? '';
$imageUrl = $attributes['imageUrl'] ?? '';
$title = $attributes['title'] ?? 'Contactez-nous';
$description = $attributes['description'] ?? 'Remplissez le formulaire ci-dessous pour nous contacter.';
?>

<section class="section-contact"<?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
  <div class="container medium-container">
    <div class="left">
        <?php if (!empty($imageUrl)) : ?>
            <img src="<?php echo esc_url($imageUrl); ?>" alt="Image de contact" />
        <?php endif; ?>
    </div>
    <div class="right">
      <div class="form-inner">
        <h2><?php echo wp_kses_post($title); ?></h2>
        <p><?php echo wp_kses_post($description); ?></p>
        <?php echo $content; // Contenu de l'InnerBlocks ?>
      </div>
    </div>
  </div>
</section>
