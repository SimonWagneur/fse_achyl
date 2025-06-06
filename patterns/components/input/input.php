<?php
$type = $attributes['type'] ?? 'texte';
$label = $attributes['label'] ?? 'Label';

// Fonction pour nettoyer le label pour l'ID
function sanitize_label($label) {
    return strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $label));
}

$id = sanitize_label($label);
?>

<div class="input-box">
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
                    <option value="">Choisissez une option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                </select>';
            break;
        default: // texte
            echo '<input type="text" id="' . esc_attr($id) . '" name="' . esc_attr($id) . '" required />';
    }
    ?>
    <label for="<?php echo esc_attr($id); ?>"><?php echo esc_html($label); ?></label>
</div>
