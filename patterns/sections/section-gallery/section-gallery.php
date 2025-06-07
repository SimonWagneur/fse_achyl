<?php
/**
 * Title: Section Galerie
 * Slug: blocktheme/section-gallery
 * Categories: sections
 * Description: Section galerie avec défilement automatique et images/vidéos cliquables.
 */

$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$mediaItems = $attributes['mediaItems'] ?? [];
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-gallery" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container">
        <h2><?php echo wp_kses_post($title); ?></h2>
    </div>
    <?php if (!empty($mediaItems)) : ?>
        <!-- Je veux que .gallery-grid puisse être draggable à la souris et qu'elle défile automatiquement vers la gauche. -->
        <div class="gallery-grid section-draggable" data-draggable="true" data-autoscroll="true">
            <?php foreach ($mediaItems as $item) : ?>
                <div class="gallery-item">
                    <?php if (!empty($item['link'])) : ?>
                        <a href="<?php echo esc_url($item['link']); ?>" target="_blank" rel="noopener noreferrer">
                    <?php endif; ?>

                    <?php if ($item['type'] === 'video') : ?>
                        <video 
                            src="<?php echo esc_url($item['url']); ?>"
                            autoplay
                            muted
                            loop
                            playsinline
                            class="gallery-video"
                        ></video>
                    <?php else : ?>
                        <img 
                            src="<?php echo esc_url($item['url']); ?>" 
                            alt="<?php echo esc_attr($item['alt']); ?>"
                            class="gallery-image"
                        />
                    <?php endif; ?>

                    <?php if (!empty($item['link'])) : ?>
                        </a>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>