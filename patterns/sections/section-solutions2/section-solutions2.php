<?php
if (!isset($attributes)) {
    return;
}

$title = $attributes['title'] ?? '';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-solution2"<?php echo $anchor ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
  <div class="container medium-container">
    <h2><?php echo wp_kses_post($title); ?></h2>
    <div class="solutions2-container">
        <?php echo $content; // Affiche le contenu des InnerBlocks ?>
    </div>
  </div>
</section>
