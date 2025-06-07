<?php
/**
 * Title: Card KPI
 * Slug: blocktheme/card-kpi
 * Categories: components
 * Description: Carte de KPI avec nombre et texte.
 */

$number = $attributes['number'] ?? '';
$wording = $attributes['wording'] ?? '';
?>

<div class="card-kpi">
    <div class="content">
        <span class="number"><?php echo wp_kses_post($number); ?></span>
        <span class="wording"><?php echo wp_kses_post($wording); ?></span>
    </div>
</div>