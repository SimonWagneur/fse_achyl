<?php
$text = $attributes['text'] ?? '';
$url = $attributes['linkObject']['url'] ?? '#';
$color = $attributes['colorName'] ?? 'black';
?>

<a
  href="<?php echo esc_url($url); ?>"
  target="_blank"
  rel="noopener noreferrer"
  style="display: inline-block;"
>
  <button class="primary <?php echo esc_attr($color); ?>">
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
