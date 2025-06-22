<?php
if (!isset($attributes)) {
    return;
}

$icon_url = $attributes['iconUrl'] ?? './assets/images/check-solid.svg';
// Si l'URL commence par http ou /wp-content, c'est une URL complète (upload Media)
$is_full_url = strpos($icon_url, 'http') === 0 || strpos($icon_url, '/wp-content') === 0;
$final_icon_url = $is_full_url ? $icon_url : get_theme_file_uri($icon_url);

$title = $attributes['title'] ?? '';
$content = $attributes['content'] ?? '';
?>

<div class="card-solution2">
    <div class="icon">
        <img src="<?php echo esc_url($final_icon_url); ?>" alt="Solution icon">
    </div>
    <div class="content">
        <h3><?php echo wp_kses_post($title); ?></h3>
        <p><?php echo wp_kses_post($content); ?></p>
    </div>
</div>