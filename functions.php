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
    wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js', array(), '1.0.0', true);
    wp_enqueue_script('scrollTrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js', array(), '1.0.0', true);
    wp_enqueue_script('splitText', get_theme_file_uri('/src/modules/SplitText.min.js'), array(), '1.0.0', true);
    
    wp_enqueue_script('main-achyl-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    wp_enqueue_script('navbar-js', get_theme_file_uri('/patterns/sections/header/frontend.js'), array('jquery'), '1.0', true);
    // wp_enqueue_script('faq-js', get_theme_file_uri('/patterns/sections/section-faq/frontend.js'), array('jquery'), '1.0', true);
    // font awesome
    wp_enqueue_script( 'font_awesome', 'https://kit.fontawesome.com/d9ec4440c9.js', array(), '1.0.0', true ); 
});


// appliquer le CSS à l'éditeur
add_action('enqueue_block_editor_assets', function () {
    // CSS principal (rendu réel du site)
    wp_enqueue_style(
        'achyl-editor-style-base',
        get_template_directory_uri() . '/style.css',
        array(),
        filemtime(get_template_directory() . '/style.css')
    );

    // CSS spécifique à l'éditeur (overrides, !important, etc.)
    wp_enqueue_style(
        'achyl-editor-style-custom',
        get_template_directory_uri() . '/editor-style.css',
        array('achyl-editor-style-base'), // dépendance pour être chargé après
        filemtime(get_template_directory() . '/editor-style.css')
    );

    // Scripts pour l'éditeur
    wp_enqueue_script('jquery');
    
    // Enregistrer les scripts frontend pour l'éditeur
    $editor_scripts = [
        'section-benefits2' => '/patterns/sections/section-benefits2/frontend.js',
        // Ajoutez d'autres scripts ici si nécessaire
    ];

    foreach ($editor_scripts as $name => $path) {
        $script_url = get_template_directory_uri() . $path;
        $script_path = get_template_directory() . $path;

        if (file_exists($script_path)) {
            wp_enqueue_script(
                'fse-achyl-' . $name . '-editor',
                $script_url,
                ['jquery'],
                filemtime($script_path),
                true
            );
        }
    }
});

add_action('after_setup_theme', function () {
    add_theme_support('editor-styles');
    add_editor_style('style.css');
});



add_action('init', function () {
  foreach (glob(__DIR__ . '/patterns/*/*/block.json') as $block_json) {
    register_block_type($block_json);
  }
});



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
        'blocktheme/section-hero1'  => 'sections/section-hero1/frontend.js',
        'blocktheme/section-list'  => 'sections/section-list/frontend.js',
        'blocktheme/section-faq'  => 'sections/section-faq/frontend.js',
        'blocktheme/section-benefits2'  => 'sections/section-benefits2/frontend.js',
        // 'blocktheme/card-step'  => 'components/card-step/frontend.js',
    ];

    foreach ( $pattern_scripts as $block => $script_path ) {
        $script_url  = get_template_directory_uri() . '/patterns/' . $script_path;
        $script_file = get_template_directory() . '/patterns/' . $script_path;

        // error_log( "Tentative d'enqueue de : $script_url" );
        // error_log( "Test presence bloc : $block = " . ( has_block( $block, $post ) ? 'oui' : 'non' ) );
        // error_log( "Test file exist : " . ( file_exists( $script_file ) ? 'oui' : 'non' ) );

        if ( has_block( $block, $post ) && file_exists( $script_file ) ) {
            // Créer un handle unique basé sur le nom du bloc
            $handle = str_replace('blocktheme/', 'fse-achyl-', $block) . '-frontend';
            
            error_log(sprintf(
                "wp_enqueue_script('%s', '%s', %s, %s, %s);",
                $handle,
                $script_url,
                "['jquery']",
                'null',
                'true'
            ));

            wp_enqueue_script(
                $handle,
                $script_url,
                ['jquery'],
                null,
                true
            );
            // error_log("Enqueue script: $script_url pour le bloc $block : OK");
        }
    }
}


