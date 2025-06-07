<?php
/**
 * Title: Form
 * Slug: blocktheme/form
 * Categories: components
 * Description: Formulaire avec titre et texte.
 */
$buttonText = $attributes['buttonText'] ?? 'Envoyer';
?>

<form class="form form-container">
    <?php echo $content; // Contenu des InnerBlocks ?>
    <input type="text" id="check" name="check">
    <button class="primary black">
        <div class="text">
            <div class="main">
                <span><?php echo esc_html($buttonText); ?></span>
            </div>
        </div>
        <div class="round-container">
            <div class="round">
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </div>
        </div>
    </button>
    <div class="responseMessage"></div>
</form>