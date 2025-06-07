<?php
/**
 * Title: Section Bénéfices 1
 * Slug: blocktheme/section-benefits1
 * Categories: sections
 * Description: Section de bénéfices avec image et texte.
 */

$heading = $attributes['heading'] ?? '';
$paragraph = $attributes['paragraph'] ?? '';
$imageUrl = $attributes['imageUrl'] ?? '';
$reversed = $attributes['reversed'] ?? false;
$animation = $attributes['animation'] ?? '';
$scrollingText = $attributes['scrollingText'] ?? '';
$mediaType = $attributes['mediaType'] ?? 'image';
$anchor = $attributes['anchor'] ?? '';

// Ajouter la classe video si c'est une vidéo
$sectionClasses = ['section-benefits1'];
if ($reversed) $sectionClasses[] = 'reversed';
if ($animation) $sectionClasses[] = esc_attr($animation);
if ($mediaType === 'video') $sectionClasses[] = 'has-video';
?>

<section class="<?php echo implode(' ', $sectionClasses); ?> <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>">
    <div class="container medium-container">
        <div class="left">
            <?php if ($heading) : ?>
                <h2 class="h2"><?php echo esc_html($heading); ?></h2>
            <?php endif; ?>
            
            <?php if ($paragraph) : ?>
                <p class="p"><?php echo esc_html($paragraph); ?></p>
            <?php endif; ?>
            
            <div class="buttons">
                <?php echo $content; ?>
            </div>
        </div>
        <div class="right">
            <div class="canvas">
                <?php if ($imageUrl) : ?>
                    <?php if ($mediaType === 'image') : ?>
                        <img id="heroBackground" src="<?php echo esc_url($imageUrl); ?>" alt="Background">
                    <?php else : ?>
                        <video 
                            id="heroBackground" 
                            src="<?php echo esc_url($imageUrl); ?>" 
                            autoplay 
                            loop 
                            muted 
                            playsinline
                        ></video>
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