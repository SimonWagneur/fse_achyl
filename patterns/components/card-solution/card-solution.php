<?php
$link_url = $attributes['linkUrl'] ?? '#';
$image_url = $attributes['imageUrl'] ?? '';
$title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$tags = $attributes['tags'] ?? [];
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
        <?php echo wp_kses_post($content); ?>
    </div>
</a>