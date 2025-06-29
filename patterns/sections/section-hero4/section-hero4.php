<?php
/**
 * Title: Section Hero 4
 * Slug: blocktheme/section-hero4
 * Categories: sections
 * Description: Section héro avec image et texte.
 */
$title = $attributes['title'] ?? '';
$text = $attributes['text'] ?? '';
$horizontalAlignment = $attributes['horizontalAlignment'] ?? 'hcenter';
$verticalAlignment = $attributes['verticalAlignment'] ?? 'vcenter';
$backgroundType = $attributes['backgroundType'] ?? 'none';
$backgroundImageUrl = $attributes['backgroundImageUrl'] ?? '';
$backgroundImageAlt = $attributes['backgroundImageAlt'] ?? '';
$backgroundVideoUrl = $attributes['backgroundVideoUrl'] ?? '';
$backgroundVideoImageUrl = $attributes['backgroundVideoImageUrl'] ?? '';
$anchor = $attributes['anchor'] ?? '';

// Générer un ID unique pour le lazy loading
$videoId = $backgroundType === 'video' ? 'hero4_video_' . uniqid() : '';
?>

<section class="section-hero4 hero <?php echo esc_attr($horizontalAlignment); ?> <?php echo esc_attr($verticalAlignment); ?>" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="background">
        <?php if ($backgroundType === 'image' && !empty($backgroundImageUrl)) : ?>
            <img 
                src="<?php echo esc_url($backgroundImageUrl); ?>"
                alt="<?php echo esc_attr($backgroundImageAlt); ?>"
            />
        <?php elseif ($backgroundType === 'video' && !empty($backgroundVideoUrl)) : ?>
            <div class="video-lazy-container" data-video-url="<?php echo esc_url($backgroundVideoUrl); ?>" id="<?php echo esc_attr($videoId); ?>">
                <div class="video-placeholder">
                    <div class="video-placeholder-content">
                        <?php if (!empty($backgroundVideoImageUrl)) : ?>
                            <!-- Image de fond personnalisée -->
                            <img 
                                src="<?php echo esc_url($backgroundVideoImageUrl); ?>"
                                alt="Image de fond"
                                style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; z-index: 1;"
                            />
                        <?php endif; ?>
                        <!-- Animation de chargement toujours visible -->
                        <div class="lds-ellipsis" style="position: relative; z-index: 2;"><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
                <video 
                    class="lazy-video"
                    preload="none"
                    muted
                    loop
                    playsinline
                ></video>
            </div>
        <?php endif; ?>
    </div>
    <div class="overlay-filter"></div>
    <div class="content">
        <h1 class="visible"><?php echo wp_kses_post($title); ?></h1>
        <p class="visible"><?php echo wp_kses_post($text); ?></p>
        <div class="visible">
            <?php echo $content; // Affiche le contenu de InnerBlocks ?>
        </div>
    </div>
</section>
