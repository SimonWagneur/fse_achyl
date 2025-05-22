<?php

// hide admin bar
add_filter('show_admin_bar', '__return_false');


// enqueue scripts
add_action('wp_enqueue_scripts', function () {
    // css
    wp_enqueue_style('achyl_main_styles', get_theme_file_uri('style.css'));
    // jquery
    wp_deregister_script('jquery');
    wp_register_script( 'jquery', 'https://code.jquery.com/jquery-3.7.1.min.js', array(), '1.0.0', true );
    // js
    wp_enqueue_script('main-achyl-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    $patterns_dir = get_theme_file_path('/patterns/');
    
    // 🔍 On récupère tous les sous-dossiers dans /patterns/
    $pattern_folders = array_filter(glob($patterns_dir . '*'), 'is_dir');

    foreach ($pattern_folders as $folder_path) {
        $pattern = basename($folder_path); // exemple : "hero1", "header"
        $js_path = "$folder_path/frontend.js";

        if (file_exists($js_path)) {
            wp_enqueue_script(
                "pattern-{$pattern}-js",
                get_theme_file_uri("/patterns/$pattern/frontend.js"),
                ['jquery'],
                filemtime($js_path),
                true
            );
        }
    }
    // font awesome
    wp_enqueue_script( 'font_awesome', 'https://kit.fontawesome.com/d9ec4440c9.js', array(), '1.0.0', true ); 
});


// appliquer le CSS à l’éditeur
add_action('enqueue_block_editor_assets', function () {
    // CSS principal (rendu réel du site)
    wp_enqueue_style(
        'achyl-editor-style-base',
        get_template_directory_uri() . '/style.css',
        array(),
        filemtime(get_template_directory() . '/style.css')
    );

    // CSS spécifique à l’éditeur (overrides, !important, etc.)
    wp_enqueue_style(
        'achyl-editor-style-custom',
        get_template_directory_uri() . '/editor-style.css',
        array('achyl-editor-style-base'), // dépendance pour être chargé après
        filemtime(get_template_directory() . '/editor-style.css')
    );
});


add_action('init', function () {
  foreach (glob(__DIR__ . '/patterns/*/block.json') as $block_json) {
    register_block_type($block_json);
  }
});

// add_action('init', function () {
//   $blocks = glob(__DIR__ . '/patterns/*/block.json');
  
//   if (empty($blocks)) {
//     error_log("❌ Aucun block.json trouvé dans /patterns/");
//     return;
//   }

//   foreach ($blocks as $block) {
//     error_log("🔍 Tentative d'enregistrement bloc : $block");
//     register_block_type($block);
//   }
// });