<?php
/**
 * Title: Section Hero 1
 * Slug: blocktheme/section-hero1
 * Categories: sections
 * Description: Section héro principale avec image et texte.
 */

$heading = $attributes['heading'] ?? '';
$paragraph = $attributes['paragraph'] ?? '';
$imageUrl = $attributes['imageUrl'] ?? 'https://achyl.be/wp-content/themes/achyl/images/home_bg_1080.png';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-hero1"<?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
  <div class="container medium-container">
    <div class="left">
      <?php if (!empty($heading)) : ?>
        <h1 class="h1 visible"><?php echo wp_kses_post($heading); ?></h1>
      <?php endif; ?>

      <?php if (!empty($paragraph)) : ?>
        <p class="p visible"><?php echo wp_kses_post($paragraph); ?></p>
      <?php endif; ?>
      <div class="visible">
        <?php echo $content; // InnerBlocks content ?>
      </div>
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
