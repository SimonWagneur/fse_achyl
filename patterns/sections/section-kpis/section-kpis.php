<?php
$title = $attributes['title'] ?? '';
?>

<section class="section-kpi">
  <div class="container medium-container">
    <h2><?php echo wp_kses_post($title); ?></h2>
    <div class="kpis">
        <?php echo $content; // Affiche le contenu des InnerBlocks (card-kpi) ?>
    </div>
  </div>
</section>
