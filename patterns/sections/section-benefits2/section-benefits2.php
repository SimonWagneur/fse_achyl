<?php
/**
 * Title: Section Bénéfices 2
 * Slug: blocktheme/section-benefits2
 * Categories: sections
 * Description: Section de bénéfices avec slider et image.
 */

$imageUrl = $attributes['imageUrl'] ?? '';
$themeMode = $attributes['themeMode'] ?? 'light';
$anchor = $attributes['anchor'] ?? '';

$sectionClasses = ['section-benefits2'];
if ($themeMode === 'dark') $sectionClasses[] = 'dark-mode';
?>

<section class="<?php echo implode(' ', $sectionClasses); ?>" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container">
        <div class="left">
            <div class="state"></div>
            <h2 class="h2"></h2>
            <p class="p"></p>
            <div class="controls">
                <div class="control prev disabled"><i class="fa-solid fa-arrow-left"></i></div>
                <div class="control next"><i class="fa-solid fa-arrow-right"></i></div>
            </div>
        </div>
        <div class="right">
            <div class="canvas">
                <img id="heroBackground" src="" alt="Background">
            </div>
        </div>
    </div>
    <div class="slides">
        <?php echo wp_kses_post($content); ?>
    </div>
</section>