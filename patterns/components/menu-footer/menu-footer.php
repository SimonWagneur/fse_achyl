<?php
/**
 * Title: Menu Footer
 * Slug: blocktheme/menu-footer
 * Categories: components
 * Description: Menu de pied de page avec titre et texte.
 */

$menu_slug = $attributes['menuSlug'] ?? '';
$title = $attributes['title'] ?? 'Menu Title';

if (!function_exists('get_navigation_menu_items')) {
    function get_navigation_menu_items($menu_slug) {
        if (empty($menu_slug)) {
            return '';
        }

        $menu_post = get_page_by_path($menu_slug, OBJECT, 'wp_navigation');
        if (!$menu_post instanceof WP_Post) {
            return '';
        }

        $blocks = parse_blocks($menu_post->post_content);
        $menu_items = [];

        foreach ($blocks as $block) {
            if ($block['blockName'] === 'core/navigation-link') {
                $url = $block['attrs']['url'] ?? '#';
                $label = $block['attrs']['label'] ?? '';
                $description = $block['attrs']['description'] ?? '';
                $target = !empty($block['attrs']['opensInNewTab']) ? ' target="_blank" rel="noopener noreferrer"' : '';
                
                $menu_items[] = [
                    'url' => $url,
                    'label' => $label,
                    'description' => $description,
                    'target' => $target
                ];
            }
        }

        return $menu_items;
    }
}

$menu_items = get_navigation_menu_items($menu_slug);
?>

<div class="menu-footer">
    <div class="title-menu"><?php echo esc_html($title); ?></div>
    <?php if (!empty($menu_items)) : ?>
        <ul>
            <?php foreach ($menu_items as $item) : ?>
                <li>
                    <a href="<?php echo esc_url($item['url']); ?>"<?php echo $item['target']; ?>>
                        <?php 
                        if (!empty($item['description'])) {
                            echo wp_kses_post(nl2br($item['description']));
                        } else {
                            echo esc_html($item['label']);
                        }
                        ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</div>