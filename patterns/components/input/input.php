<?php
$type = $attributes['type'] ?? 'texte';
$label = $attributes['label'] ?? 'Label';
$width = $attributes['width'] ?? 'w100';
$selectOptions = $attributes['selectOptions'] ?? [];

// Fonction pour nettoyer le label pour l'ID
if (!function_exists('sanitize_label')) {
    function sanitize_label($label) {
        return strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $label));
    }
}

$id = sanitize_label($label);
?>

<div class="input-box <?php echo esc_attr($width); ?>">
    <?php
    switch($type) {
        case 'date':
            echo '<input type="date" id="' . esc_attr($id) . '" name="' . esc_attr($id) . '" required />';
            break;
        case 'checkbox':
            echo '<input type="checkbox" id="' . esc_attr($id) . '" name="' . esc_attr($id) . '" required />';
            break;
        case 'fichier':
            echo '<input type="file" id="' . esc_attr($id) . '" name="' . esc_attr($id) . '" />';
            break;
        case 'liste':
            echo '<select id="' . esc_attr($id) . '" name="' . esc_attr($id) . '" required>
                    <option value="">Choisissez une option</option>';
            foreach ($selectOptions as $option) {
                $optionValue = isset($option['value']) ? $option['value'] : sanitize_label($option['label']);
                echo '<option value="' . esc_attr($optionValue) . '">' . esc_html($option['label']) . '</option>';
            }
            echo '</select>';
            break;
        case 'message':
            echo '<textarea id="' . esc_attr($id) . '" name="' . esc_attr($id) . '" required></textarea>';
            break;
        default: // texte
            echo '<input type="text" id="' . esc_attr($id) . '" name="' . esc_attr($id) . '" required />';
    }
    ?>
    <label for="<?php echo esc_attr($id); ?>"><?php echo esc_html($label); ?></label>
</div>
