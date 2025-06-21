<?php

// theme slug variable
$theme_slug = 'fse_achyl';

// theme update
add_filter( 'pre_set_site_transient_update_themes', 'check_for_theme_update' );

function check_for_theme_update( $transient ) {
    $theme_slug = 'fse_achyl'; // doit correspondre EXACTEMENT au dossier de ton thème
    $update_url = 'https://simonwagneur.github.io/fse_achyl/update.json';

    $response = wp_remote_get( $update_url );
    if ( is_wp_error( $response ) ) return $transient;

    $data = json_decode( wp_remote_retrieve_body( $response ) );

    if (
        isset( $data->version ) &&
        version_compare( wp_get_theme( $theme_slug )->get( 'Version' ), $data->version, '<' )
    ) {
        $transient->response[$theme_slug] = array(
            'theme'       => $theme_slug,
            'new_version' => $data->version,
            'url'         => $data->details_url,
            'package'     => $data->download_url,
        );
    }

    return $transient;
}



// hide admin bar
add_filter('show_admin_bar', '__return_false');

// enqueue scripts
add_action('wp_enqueue_scripts', function () {
    // css
    wp_enqueue_style('achyl_main_styles', get_theme_file_uri('style.css'));

    // jquery
    wp_deregister_script('jquery');
    wp_register_script( 'jquery', 'https://code.jquery.com/jquery-3.7.1.min.js', array(), '1.0.0', true );

    // // gsap
    // wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js', array(), '1.0.0', true);
    // wp_enqueue_script('scrollTrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js', array(), '1.0.0', true);
    // wp_enqueue_script('splitText', get_theme_file_uri('/src/modules/SplitText.min.js'), array(), '1.0.0', true);
    
    // js front-end uniquement
    if (!is_admin()) {
        wp_enqueue_script('header-js', get_theme_file_uri('/patterns/sections/header/frontend.js'), array('jquery'), '1.0', true);
        wp_enqueue_script('to-the-top-js', get_theme_file_uri('/src/modules/to-the-top.js'), array('jquery'), '1.0', true);
    }

    // font awesome
    wp_enqueue_script( 'font_awesome', 'https://kit.fontawesome.com/d9ec4440c9.js', array(), '1.0.0', true ); 
});

// Ajouter les données du thème au JavaScript
function add_theme_data() {
    wp_localize_script('main-achyl-js', 'themeData', array(
        'root' => get_template_directory_uri() . '/'
    ));
}
add_action('wp_enqueue_scripts', 'add_theme_data');


// appliquer le CSS et JS à l'éditeur
add_action('enqueue_block_editor_assets', function () {
    // JS de l'éditeur
    wp_enqueue_script('main-achyl-js', get_theme_file_uri('/build/index.js'), array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'), '1.0', true);

    // Font Awesome pour l'éditeur
    wp_enqueue_script('font_awesome', 'https://kit.fontawesome.com/d9ec4440c9.js', array(), '1.0.0', true);

    // CSS principal
    wp_enqueue_style(
        'achyl-editor-style-base',
        get_template_directory_uri() . '/style.css',
        array(),
        filemtime(get_template_directory() . '/style.css')
    );

    // CSS éditeur
    wp_enqueue_style(
        'achyl-editor-style-custom',
        get_template_directory_uri() . '/editor-style.css',
        array('achyl-editor-style-base'),
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


// register blocks
add_action('init', function () {
  foreach (glob(__DIR__ . '/patterns/*/*/block.json') as $block_json) {
    register_block_type($block_json);
  }
});



// enqueue scripts dynamicly
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
    ];

    foreach ( $pattern_scripts as $block => $script_path ) {
        $script_url  = get_template_directory_uri() . '/patterns/' . $script_path;
        $script_file = get_template_directory() . '/patterns/' . $script_path;
        

        if ( has_block( $block, $post ) && file_exists( $script_file ) ) {


            // Créer un handle unique basé sur le nom du bloc
            $handle = str_replace('blocktheme/', 'fse-achyl-', $block) . '-frontend';

            wp_enqueue_script(
                $handle,
                $script_url,
                ['jquery'],
                null,
                true
            );
        }
    }

    $global_scripts = [
        '.form' => 'Forms.js',
        '.section-benefits1.scrollingText' => 'scrollingText.js',
        '.section-benefits1.scrollingHorizontal' => 'scrollingHorizontal.js',
        '.section-benefits1.scrollingVertical' => 'scrollingVertical.js',
        '.section-benefits1.scrollingToggle' => 'scrollingToggle.js',
        '.section-draggable' => 'draggableAutomatedScrolling.js',
        '.slider-container' => 'slider.js',
    ];

    foreach ($global_scripts as $selector => $script_path) {
        // Créer un handle unique basé sur le nom du script
        $handle = 'fse-achyl-' . str_replace(['.js', '.'], ['', '-'], $script_path);
        
        // Préparer le script à injecter pour vérifier la présence de la classe
        $check_script = "
            if (typeof window.scriptChecked === 'undefined') {
                window.scriptChecked = {};
            }
            
            if (!window.scriptChecked['" . $script_path . "']) {
                window.scriptChecked['" . $script_path . "'] = true;
                var elements = document.querySelectorAll('" . $selector . "');
                
                if (elements.length > 0) {
                    var script = document.createElement('script');
                    script.src = '" . get_template_directory_uri() . "/src/modules/$script_path';
                    script.type = 'module';  // Ajout du type module
                    script.defer = true;
                    script.onload = function() {
                        // console.log('📥 Script chargé avec succès: " . $script_path . "');
                    };
                    document.body.appendChild(script);
                }
            }
        ";

        // Vérifier si le fichier existe
        $script_file = get_template_directory() . '/src/modules/' . $script_path;
        if (file_exists($script_file)) {
            // Ajouter le script uniquement dans le footer
            add_action('wp_footer', function() use ($check_script) {
                echo '<script type="text/javascript">' . $check_script . '</script>';
            }, 99);
        }
    }
}
add_action( 'wp', 'fse_achyl_enqueue_pattern_scripts' );

