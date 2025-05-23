<?php
$menu1_slug = $attributes['menu1Slug'] ?? '';
$menu2_slug = $attributes['menu2Slug'] ?? '';
$menu3_slug = $attributes['menu3Slug'] ?? '';
$menu4_slug = $attributes['menu4Slug'] ?? '';
$copyright_text = $attributes['copyrightText'] ?? '@2024 Achyl - All rights reserved';
$social_menu_slug = $attributes['socialMenuSlug'] ?? '';
$logo_url = $attributes['logoUrl'] ?? 'https://achyl.be/wp-content/themes/achyl/images/achyl_black.png';

if (!function_exists('get_navigation_menu_html')) {
    function get_navigation_menu_html($menu_slug) {
        if (empty($menu_slug)) {
            return '';
        }

        $menu_post = get_page_by_path($menu_slug, OBJECT, 'wp_navigation');
        if (!$menu_post instanceof WP_Post) {
            return '';
        }

        $blocks = parse_blocks($menu_post->post_content);
        $menu_html = '<ul>';

        foreach ($blocks as $block) {
            if ($block['blockName'] === 'core/navigation-link') {
                $url = $block['attrs']['url'] ?? '#';
                $label = $block['attrs']['label'] ?? '';
                $target = !empty($block['attrs']['opensInNewTab']) ? ' target="_blank" rel="noopener noreferrer"' : '';
                
                $menu_html .= sprintf(
                    '<li><a href="%s"%s>%s</a></li>',
                    esc_url($url),
                    $target,
                    esc_html($label)
                );
            }
        }

        $menu_html .= '</ul>';
        return $menu_html;
    }
}

if (!function_exists('get_social_menu_html')) {
    function get_social_menu_html($menu_slug) {
        if (empty($menu_slug)) {
            return '';
        }

        $menu_post = get_page_by_path($menu_slug, OBJECT, 'wp_navigation');
        if (!$menu_post instanceof WP_Post) {
            return '';
        }

        $blocks = parse_blocks($menu_post->post_content);
        $menu_html = '';

        foreach ($blocks as $block) {
            if ($block['blockName'] === 'core/navigation-link') {
                $url = $block['attrs']['url'] ?? '#';
                $label = $block['attrs']['label'] ?? '';
                // Extract social media name from URL or label to determine icon
                $social_type = '';
                if (strpos($url, 'instagram') !== false || strpos($label, 'Instagram') !== false) {
                    $social_type = 'instagram';
                } elseif (strpos($url, 'facebook') !== false || strpos($label, 'Facebook') !== false) {
                    $social_type = 'facebook-f';
                } elseif (strpos($url, 'youtube') !== false || strpos($label, 'YouTube') !== false) {
                    $social_type = 'youtube';
                }
                
                if ($social_type) {
                    $menu_html .= sprintf(
                        '<a class="link" href="%s" aria-label="%s"><i class="fa-brands fa-%s" aria-hidden="true"></i></a>',
                        esc_url($url),
                        esc_attr($label),
                        esc_attr($social_type)
                    );
                }
            }
        }

        return $menu_html;
    }
}
?>

<div class="footer">
    <div class="upper">
        <div class="left">
            <a href="<?php echo esc_url(home_url('/')); ?>">
                <img class="logo" src="<?php echo esc_url($logo_url); ?>" alt="Site Logo">
            </a>
            <div class="menus">
                <div class="menu">
                    <h4>Contact</h4>
                    <?php echo get_navigation_menu_html($menu1_slug); ?>
                </div>
                <div class="menu">
                    <h4>Solutions</h4>
                    <?php echo get_navigation_menu_html($menu2_slug); ?>
                </div>
                <div class="menu">
                    <h4>Liens utiles</h4>
                    <?php echo get_navigation_menu_html($menu3_slug); ?>
                </div>
                <div class="menu">
                    <h4>A propos</h4>
                    <?php echo get_navigation_menu_html($menu4_slug); ?>
                </div>
            </div>
        </div>
        <i class="fa-solid fa-angle-up to-the-top" aria-hidden="true"></i>
    </div>

    <div class="lower">
        <div class="left"><?php echo wp_kses_post($copyright_text); ?></div>
        <div class="right">
            <?php echo get_social_menu_html($social_menu_slug); ?>
        </div>
    </div>
</div>