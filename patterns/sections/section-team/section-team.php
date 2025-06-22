<?php
/** 
 * Title: Section Team
 * Slug: blocktheme/section-team
 * Categories: sections
 * Description: Section équipe avec titre et contenu.
 */

// Récupération des attributs
$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-team" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
  <div class="container medium-container">
    <h2><?php echo wp_kses_post($title); ?></h2>
    <div class="team-members">
        <?php echo wp_kses_post($content); ?>
    </div>
  </div>
</section>
