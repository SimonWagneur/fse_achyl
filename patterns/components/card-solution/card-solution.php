<?php
/**
 * Title: Card Solution
 * Slug: blocktheme/card-solution
 * Categories: components
 * Description: Carte de solution avec titre et texte.
 */

$link_url = $attributes['linkUrl'] ?? '#';
$image_url = $attributes['imageUrl'] ?? '';
$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$tags = $attributes['tags'] ?? [];
$button_color = $attributes['buttonColor'] ?? 'black';
$button_text = $attributes['buttonText'] ?? 'Cliquez ici';
?>

<a href="<?php echo esc_url($link_url); ?>" class="card-solution">
    <div class="top">
        <div class="banner">
            <div class="background" style="background-image: url('<?php echo esc_url($image_url); ?>');"></div>
        </div>
        <div class="content">
            <h3 class="h3"><?php echo esc_html($title); ?></h3>
            <p class="p"><?php echo esc_html($description); ?></p>
            <div class="tags">
                <?php foreach ($tags as $tag) : ?>
                    <div class="tag"><?php echo esc_html($tag); ?></div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <div class="bottom">
    <div class="secondary <?php echo esc_attr($button_color); ?>">
        <?php echo esc_html($button_text); ?>
    </div>
    </div>
</a>