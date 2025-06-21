<?php
/**
 * Title: Section Bénéfices 3
 * Slug: blocktheme/section-benefits3
 * Categories: sections
 * Description: Section de bénéfices avec image et texte.
 */

$heading = $attributes['heading'] ?? '';
$imageUrl = $attributes['imageUrl'] ?? '';
$reversed = $attributes['reversed'] ?? false;
$themeMode = $attributes['themeMode'] ?? 'light';
$anchor = $attributes['anchor'] ?? '';

// Construire les classes CSS
$sectionClasses = ['section-benefits3'];
if ($reversed) $sectionClasses[] = 'reversed';
if ($themeMode === 'dark') $sectionClasses[] = 'dark-mode';
?>

<section class="<?php echo implode(' ', $sectionClasses); ?>" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
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
                <img id="heroBackground" src="<?php echo esc_url($imageUrl); ?>" alt="Background">
            <?php endif; ?>
        </div>
    </div>
</section>