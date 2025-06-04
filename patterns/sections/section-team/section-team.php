<?php
/**
 * Section Team Block Template.
 */

// Récupération des attributs
$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
?>

<section class="section-team">
  <div class="container medium-container">
    <h2><?php echo wp_kses_post($title); ?></h2>
    <div class="team-members">
        <?php echo wp_kses_post($content); ?>
    </div>
  </div>
</section>
