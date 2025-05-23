<?php
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
                $target = !empty($block['attrs']['opensInNewTab']) ? ' target="_blank" rel="noopener noreferrer"' : '';
                
                $menu_items[] = [
                    'url' => $url,
                    'label' => $label,
                    'target' => $target
                ];
            }
        }

        return $menu_items;
    }
}

$menu_items = get_navigation_menu_items($menu_slug);
?>

<div class="menu">
    <h4><?php echo esc_html($title); ?></h4>
    <?php if (!empty($menu_items)) : ?>
        <ul>
            <?php foreach ($menu_items as $item) : ?>
                <li>
                    <a href="<?php echo esc_url($item['url']); ?>"<?php echo $item['target']; ?>>
                        <?php echo esc_html($item['label']); ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</div>