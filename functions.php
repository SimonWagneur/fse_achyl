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
    wp_enqueue_script('navbar-js', get_theme_file_uri('/patterns/header/frontend.js'), array('jquery'), '1.0', true);
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

add_action('after_setup_theme', function () {
    add_theme_support('editor-styles');
    add_editor_style('style.css');
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

// add_action('init', function () {
//     $post_type = get_post_type_object('wp_navigation');
//     error_log('Navigation post type : ' . print_r($post_type, true));
// });

add_action( 'wp', 'fse_achyl_enqueue_pattern_scripts' );

function fse_achyl_enqueue_pattern_scripts() {
    if ( ! is_singular() ) {
        return;
    }

    global $post;
    if ( ! $post ) {
        return;
    }

    $pattern_scripts = [
        'blocktheme/header' => 'header/frontend.js',
        'blocktheme/hero1'  => 'hero1/frontend.js',
        'blocktheme/button' => 'button/frontend.js',
    ];

    foreach ( $pattern_scripts as $block => $script_path ) {
        $script_url  = get_template_directory_uri() . '/patterns/' . $script_path;
        $script_file = get_template_directory() . '/patterns/' . $script_path;

        error_log( "Tentative d'enqueue de : $script_url" );
        error_log( "Test presence bloc : $block = " . ( has_block( $block, $post ) ? 'oui' : 'non' ) );

        if ( has_block( $block, $post ) && file_exists( $script_file ) ) {
            wp_enqueue_script(
                'fse-achyl-' . sanitize_title( basename( $script_path ) ),
                $script_url,
                ['jquery'],
                null,
                true
            );
        }
    }
}


