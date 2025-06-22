<?php
/**
 * Title: Card Team Member
 * Slug: blocktheme/card-team-member
 * Categories: components
 * Description: Carte de membre de l'équipe avec photo, nom et description.
 */

// Récupération des attributs
$profile_image = $attributes['profileImage'] ?? null;
$member_name = $attributes['memberName'] ?? '';
$member_description = $attributes['memberDescription'] ?? '';
?>

<div class="card-team-member">
    <div class="pp">
        <?php if (!empty($profile_image['url'])) : ?>
            <img src="<?php echo esc_url($profile_image['url']); ?>" 
                 alt="<?php echo esc_attr($profile_image['alt']); ?>" />
        <?php endif; ?>
    </div>
    <h3><?php echo wp_kses_post($member_name); ?></h3>
    <p><?php echo wp_kses_post($member_description); ?></p>
</div>