<?php
/**
 * Title: Section Sponsors
 * Slug: blocktheme/section-sponsors
 * Categories: sections
 * Description: Section sponsors avec images.
 */

// Récupération des attributs
$sponsor_images = $attributes['sponsorImages'] ?? [];
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-sponsors" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <?php if (!empty($sponsor_images)) : ?>
        <div class="sponsors-grid section-draggable" data-draggable="true" data-autoscroll="true">
            <?php foreach ($sponsor_images as $image) : ?>
                <div class="sponsor-item">
                    <img 
                        src="<?php echo esc_url($image['url']); ?>"
                        alt="<?php echo esc_attr($image['alt']); ?>"
                    />
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>
