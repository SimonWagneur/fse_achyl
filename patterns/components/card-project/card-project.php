<?php
/**
 * Title: Card Project
 * Slug: blocktheme/card-project
 * Categories: components
 * Description: Carte de projet avec titre et texte.
 */

$title = $attributes['title'] ?? 'Titre du projet';
$content = $attributes['content'] ?? 'Description du projet';
$buttonText = $attributes['buttonText'] ?? 'Voir le projet';
$buttonUrl = $attributes['buttonUrl'] ?? '#';
$imageUrl = $attributes['imageUrl'] ?? '';
$tags = $attributes['tags'] ?? [];
?>

<div class="slide card-project">
    <div class="left">
        <h3 class="h3"><?php echo esc_html($title); ?></h3>
        <p class="p"><?php echo esc_html($content); ?></p>
        <div class="tags">
            <?php foreach ($tags as $tag) : ?>
                <div class="tag"><?php echo esc_html($tag); ?></div>
            <?php endforeach; ?>
        </div>
        <a target="_blank" href="<?php echo esc_url($buttonUrl); ?>" style="display: inline-block;">
            <button class="primary black">
                <div class="text">
                    <div class="main"><?php echo esc_html($buttonText); ?></div>
                </div>
                <div class="round-container">
                    <div class="round">
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </button>
        </a>
    </div>
    <div class="right">
        <div class="canvas">
            <?php if ($imageUrl): ?>
                <img src="<?php echo esc_url($imageUrl); ?>" alt="<?php echo esc_attr($title); ?>">
            <?php endif; ?>
        </div>
    </div>
</div>