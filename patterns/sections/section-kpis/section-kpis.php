<?php
/**
 * Title: Section KPIs
 * Slug: blocktheme/section-kpis
 * Categories: sections
 * Description: Section KPIs avec titre et cartes.
 */
$title = $attributes['title'] ?? '';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-kpi" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
  <div class="container medium-container">
    <h2><?php echo wp_kses_post($title); ?></h2>
    <div class="kpis">
        <?php echo $content; // Affiche le contenu des InnerBlocks (card-kpi) ?>
    </div>
  </div>
</section>
