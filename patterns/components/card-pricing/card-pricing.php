<?php

$title = $attributes['title'] ?? 'Titre de l\'offre';
$description = $attributes['description'] ?? 'Description de l\'offre';
$fullPrice = $attributes['fullPrice'] ?? '99€';
$fullPriceTva = $attributes['fullPriceTva'] ?? 'TTC';
$hasReducedPrice = $attributes['hasReducedPrice'] ?? false;
$reducedPrice = $attributes['reducedPrice'] ?? '';
$reducedPriceTva = $attributes['reducedPriceTva'] ?? 'TTC';
$promoEndDate = $attributes['promoEndDate'] ?? '';

$showPromo = $hasReducedPrice && !empty($reducedPrice);
$showPromoDate = $showPromo && !empty($promoEndDate);
?>

<div class="card-pricing">
    <div class="top">
        <h3 class="h3"><?php echo esc_html($title); ?></h3>
        <p class="p"><?php echo nl2br($description); ?></p>
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

        <?php echo wp_kses_post($content); ?>
    </div>
</div>