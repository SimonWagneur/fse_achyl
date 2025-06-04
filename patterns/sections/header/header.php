<?php
$menu_slug  = $attributes['menuSlug'] ?? '';
$menu_html = '';
$imageUrl = $attributes['imageUrl'];
$is_transparent = $attributes['isTransparent'] ?? false;

// Récupérer le contenu d'un menu FSE enregistré comme un post
if (!empty($menu_slug)) {
    $menu_post = get_page_by_path($menu_slug, OBJECT, 'wp_navigation');
    if ($menu_post instanceof WP_Post) {
        $menu_html = do_blocks($menu_post->post_content);
    }
}
?>

<div class="navbar<?php echo $is_transparent ? ' transparent' : ''; ?>">
  <div class="left">
    <a href="<?php echo esc_url(home_url('/')); ?>">
      <?php
      if (!empty($imageUrl)) {
          echo '<img class="logo" src="' . esc_url($imageUrl) . '" alt="Site Logo">';
      } else {
          echo 'Mon Logo';
      }
      ?>
    </a>

  <div class="menu-container">
    <ul class="menu">
      <?php
      $menu_slug = $attributes['menuSlug'] ?? '';

      if (!empty($menu_slug)) {
          $menu_post = get_page_by_path($menu_slug, OBJECT, 'wp_navigation');

          if ($menu_post instanceof WP_Post) {
              $blocks = parse_blocks($menu_post->post_content);

              foreach ($blocks as $block) {
                  if ($block['blockName'] === 'core/navigation-link') {
                      $url = $block['attrs']['url'] ?? '#';
                      $label = $block['attrs']['label'] ?? 'Lien';

                      echo '<li>';
                      echo '<a href="' . esc_url($url) . '">';
                      echo '<div class="bg"></div>';
                      echo '<span>' . esc_html($label) . '</span>';
                      echo '</a>';
                      echo '</li>';
                  }
              }
          } else {
              echo '<li><a href="#">Menu non trouvé</a></li>';
          }
      } else {
          echo '<li><a href="#">Aucun menu sélectionné</a></li>';
      }
      ?>
    </ul>
  </div>
  </div>

  <div class="right">
    <?php echo $content; ?>
  </div>
</div>
