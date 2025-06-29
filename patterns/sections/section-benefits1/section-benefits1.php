<?php
/**
 * Title: Section Bénéfices 1
 * Slug: blocktheme/section-benefits1
 * Categories: sections
 * Description: Section de bénéfices avec image et texte.
 */

$heading = $attributes['heading'] ?? '';
$imageUrl = $attributes['imageUrl'] ?? '';
$backgroundImageUrl = $attributes['backgroundImageUrl'] ?? '';
$reversed = $attributes['reversed'] ?? false;
$animation = $attributes['animation'] ?? '';
$scrollingText = $attributes['scrollingText'] ?? '';
$mediaType = $attributes['mediaType'] ?? 'image';
$themeMode = $attributes['themeMode'] ?? 'light';
$anchor = $attributes['anchor'] ?? '';

// Ajouter la classe video si c'est une vidéo
$sectionClasses = ['section-benefits1'];
if ($reversed) $sectionClasses[] = 'reversed';
if ($animation) $sectionClasses[] = esc_attr($animation);
if ($mediaType === 'video') $sectionClasses[] = 'has-video';
if ($themeMode === 'dark') $sectionClasses[] = 'dark-mode';

// Générer un ID unique pour le lazy loading
$videoId = $mediaType === 'video' ? 'video_' . uniqid() : '';
?>

<section class="<?php echo implode(' ', $sectionClasses); ?>" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container">
        <div class="left">
            <?php if ($heading) : ?>
                <h2 class="h2"><?php echo esc_html($heading); ?></h2>
            <?php endif; ?>
            
            <div class="content">
                <?php echo $content; ?>
            </div>
        </div>
        <div class="right">
            <div class="canvas">
                <?php if ($imageUrl) : ?>
                    <?php if ($mediaType === 'image') : ?>
                        <img id="heroBackground" src="<?php echo esc_url($imageUrl); ?>" alt="Background">
                    <?php else : ?>
                        <div class="video-lazy-container" data-video-url="<?php echo esc_url($imageUrl); ?>" id="<?php echo esc_attr($videoId); ?>">

                            <div class="video-placeholder">
                                <div class="video-placeholder-content">
                                    <?php if ($backgroundImageUrl) : ?>
                                        <!-- Image de fond personnalisée -->
                                        <img 
                                            src="<?php echo esc_url($backgroundImageUrl); ?>" 
                                            alt="Image de fond" 
                                            class="background-image"
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
                <?php endif; ?>
                
                <?php if ($mediaType === 'image' && $animation === 'scrollingText' && $scrollingText) : ?>
                    <p class="scrolling-text"><?php echo esc_html($scrollingText); ?></p>
                <?php endif; ?>
                
                <?php if ($mediaType === 'image' && $animation === 'scrollingToggle') : ?>
                    <div class="toggle-button-box active">
                        <div class="toggle-button-content">
                            <div class="toggle-button-bg">
                                <div class="toggle-button-on-off"></div>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>