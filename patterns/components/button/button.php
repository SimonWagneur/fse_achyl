<?php
$text = $attributes['text'] ?? '';
$link_url = $attributes['linkUrl'] ?? '#';
$color_name = $attributes['colorName'] ?? 'black';
?>

<a href="<?php echo esc_url($link_url); ?>" target="_blank" rel="noopener noreferrer">
    <button class="primary <?php echo esc_attr($color_name); ?>">
        <div class="text">
            <div class="main">
                <span><?php echo esc_html($text); ?></span>
            </div>
        </div>
        <div class="round-container">
            <div class="round">
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </div>
        </div>
    </button>
</a>
