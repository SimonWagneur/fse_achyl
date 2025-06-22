<?php
/**
 * Title: Card Pricing
 * Slug: blocktheme/card-pricing
 * Categories: components
 * Description: Carte de prix avec titre et texte.
 */
$title = $attributes['title'] ?? 'Titre de l\'offre';
$description = $attributes['description'] ?? 'Description de l\'offre';
$fullPrice = $attributes['fullPrice'] ?? '99€';
$fullPriceTva = $attributes['fullPriceTva'] ?? 'TTC';
$hasReducedPrice = $attributes['hasReducedPrice'] ?? false;
$reducedPrice = $attributes['reducedPrice'] ?? '';
$reducedPriceTva = $attributes['reducedPriceTva'] ?? 'TTC';
$promoEndDate = $attributes['promoEndDate'] ?? '';
$hasButton = $attributes['hasButton'] ?? false;
$buttonText = $attributes['buttonText'] ?? 'Choisir cette offre';
$buttonUrl = $attributes['buttonUrl'] ?? '#';

$showPromo = $hasReducedPrice && !empty($reducedPrice);
$showPromoDate = $showPromo && !empty($promoEndDate);

?>

<div class="card-pricing">
    <div class="top">
        <h3 class="h3"><?php echo esc_html($title); ?></h3>
        <div class="features">
            <?php echo $content; ?>
        </div>
    </div>
    <div class="bottom">
        <?php if ($showPromo): ?>
            <div class="prix inactive">
                <div class="montant"><?php echo $fullPrice; ?></div>
                <div class="tva"><?php echo esc_html($fullPriceTva); ?></div>
            </div>
        <?php endif; ?>
        
        <div class="prix">
            <div class="montant"><?php echo esc_html($showPromo ? $reducedPrice : $fullPrice); ?></div>
            <div class="tva"><?php echo esc_html($showPromo ? $reducedPriceTva : $fullPriceTva); ?></div>
        </div>

        <?php if ($showPromoDate): ?>
            <div class="promo">
                Jusqu'au <?php echo esc_html(date_i18n('j F Y', strtotime($promoEndDate))); ?>
            </div>
        <?php endif; ?>

        <?php if ($hasButton): ?>
            <div class="buttons">
                <a href="<?php echo esc_url($buttonUrl); ?>" target="_blank" rel="noopener noreferrer">
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
                </a>
            </div>
        <?php endif; ?>
    </div>
</div>