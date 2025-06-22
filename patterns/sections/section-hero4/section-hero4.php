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
$anchor = $attributes['anchor'] ?? '';
?>

<section class="section-hero4 hero <?php echo esc_attr($horizontalAlignment); ?> <?php echo esc_attr($verticalAlignment); ?>" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="background">
        <?php if ($backgroundType === 'image' && !empty($backgroundImageUrl)) : ?>
            <img 
                src="<?php echo esc_url($backgroundImageUrl); ?>"
                alt="<?php echo esc_attr($backgroundImageAlt); ?>"
            />
        <?php elseif ($backgroundType === 'video' && !empty($backgroundVideoUrl)) : ?>
            <div class="video-loading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: black; display: flex; align-items: center; justify-content: center; z-index: 1;">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
            <video autoplay muted loop playsinline style="position: relative; z-index: 0;" onloadeddata="this.parentNode.querySelector('.video-loading').style.display='none'; this.style.zIndex='1';">
                <source src="<?php echo esc_url($backgroundVideoUrl); ?>" type="video/mp4">
            </video>
        <?php endif; ?>
    </div>
    <div class="overlay-filter"></div>
    <div class="content">
        <h1><?php echo wp_kses_post($title); ?></h1>
        <p><?php echo wp_kses_post($text); ?></p>
        <?php echo $content; // Affiche le contenu de InnerBlocks ?>
    </div>
</section>
