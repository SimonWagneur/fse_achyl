<?php
// Rendu dynamique en PHP du bloc "header"

$menu_slug  = $attributes['menuSlug'] ?? '';

// On récupère le HTML du menu si un menu est sélectionné
$menu_html = '';
if (!empty($menu_slug)) {
    $menu_html = wp_nav_menu([
        'menu' => $menu_slug,
        'container' => false,
        'echo' => false,
        'menu_class' => 'menu'
    ]);
}
?>

<div class="navbar">
  <div class="left">
    <a href="/">
      <img class="logo" src="/wp-content/themes/votre-theme/images/achyl_black.png" alt="Site Logo" />
    </a>

    <div class="menu-container">
      <?php
      echo $menu_html ?: '<ul class="menu"><li><a href="#">Aucun menu sélectionné</a></li></ul>';
      ?>
    </div>
  </div>

  <div class="right">
    <?php echo $content; // Contenu des InnerBlocks (ex: bouton) ?>
  </div>
</div>
