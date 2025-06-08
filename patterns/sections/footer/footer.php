<?php
/**
 * Title: Footer
 * Slug: blocktheme/footer
 * Categories: sections
 * Description: Footer de la page.
 */

$copyright_text = $attributes['copyrightText'] ?? '@2024 Achyl - All rights reserved';
$social_menu_slug = $attributes['socialMenuSlug'] ?? '';
$logo_url = $attributes['logoUrl'] ?? '';
$anchor = $attributes['anchor'] ?? '';
$facebook_url = $attributes['facebookUrl'] ?? '';
$instagram_url = $attributes['instagramUrl'] ?? '';
$linkedin_url = $attributes['linkedinUrl'] ?? '';
$youtube_url = $attributes['youtubeUrl'] ?? '';

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

<div class="footer" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="upper">
        <div class="left">
            <a class="menulink" href="<?php echo esc_url(home_url('/')); ?>">
                <?php if (!empty($logo_url)) : ?>
                    <img class="logo" src="<?php echo esc_url($logo_url); ?>" alt="Site Logo">
                <?php else : ?>
                    <span class="logo">Ton Logo</span>
                <?php endif; ?>
            </a>
            <div class="menus">
                <?php echo $content; // This will render the InnerBlocks content ?>
            </div>
        </div>
        <i class="fa-solid fa-angle-up to-the-top" aria-hidden="true"></i>
    </div>

    <div class="lower">
        <div class="left"><?php echo wp_kses_post($copyright_text); ?></div>
        <div class="right">
                <?php if (!empty($facebook_url)) : ?>
                    <a target="_blank" class="link" href="<?php echo esc_url($facebook_url); ?>">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                <?php endif; ?>
                
                <?php if (!empty($instagram_url)) : ?>
                    <a target="_blank" class="link" href="<?php echo esc_url($instagram_url); ?>">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                <?php endif; ?>
                
                <?php if (!empty($linkedin_url)) : ?>
                    <a target="_blank" class="link" href="<?php echo esc_url($linkedin_url); ?>">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                <?php endif; ?>
                
                <?php if (!empty($youtube_url)) : ?>
                    <a target="_blank" class="link" href="<?php echo esc_url($youtube_url); ?>">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                <?php endif; ?>
        </div>
    </div>
</div>