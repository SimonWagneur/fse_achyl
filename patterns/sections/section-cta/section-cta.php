<?php
/**
 * Title: Section CTA
 * Slug: blocktheme/section-cta
 * Categories: sections
 * Description: Section d'appel à l'action avec titre, texte et boutons.
 */

$title = $attributes['title'] ?? 'Titre de la section CTA';
$contentP = $attributes['content'] ?? 'Contenu de la section CTA';
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-cta" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="bg">
        <div class="container">
            <h2 class="h2"><?php echo esc_html($title); ?></h2>
            <p class="p"><?php echo esc_html($contentP); ?></p>
            <div class="buttons">
                <?php echo wp_kses_post($content); ?>
            </div>
        </div>
    </div>
</section>