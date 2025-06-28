<?php
/**
 * Title: Section Bénéfices 1
 * Slug: blocktheme/section-benefits1
 * Categories: sections
 * Description: Section de bénéfices avec image et texte.
 */

$heading = $attributes['heading'] ?? '';
$imageUrl = $attributes['imageUrl'] ?? '';
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
                        <!-- Container pour la vidéo avec lazy loading -->
                        <div class="video-lazy-container" data-video-url="<?php echo esc_url($imageUrl); ?>" id="<?php echo esc_attr($videoId); ?>">
                            <!-- Placeholder pendant le chargement -->
                            <div class="video-placeholder">
                                <div class="video-placeholder-content">
                                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </div>
                            </div>
                            
                            <!-- La vidéo sera injectée ici par JavaScript -->
                            <video 
                                class="lazy-video"
                                preload="none"
                                muted
                                loop
                                playsinline
                                style="display: none;"
                            ></video>
                            
                            <!-- Script pour le délai de chargement -->
                            <script>
                                setTimeout(function() {
                                    var placeholder = document.querySelector('#<?php echo esc_attr($videoId); ?> .video-placeholder');
                                    if (placeholder) {
                                        placeholder.style.display = 'none';
                                    }
                                }, 1000);
                            </script>
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