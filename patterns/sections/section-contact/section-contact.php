<?php
$anchor = $attributes['anchor'] ?? '';
$imageUrl = $attributes['imageUrl'] ?? '';
$title = $attributes['title'] ?? 'Contactez-nous';
$description = $attributes['description'] ?? 'Remplissez le formulaire ci-dessous pour nous contacter.';
?>

<section class="section-contact"<?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
  <div class="container medium-container">
    <div class="left">
        <?php if (!empty($imageUrl)) : ?>
            <img src="<?php echo esc_url($imageUrl); ?>" alt="Image de contact" />
        <?php endif; ?>
    </div>
    <div class="right">
      <div class="form-inner">
        <h2><?php echo wp_kses_post($title); ?></h2>
        <p><?php echo wp_kses_post($description); ?></p>
        <div class="form-container">
            <div class="input-box w50">
                <input type="text" id="prenom" name="prenom" required />
                <label for="prenom">Prénom</label>
                
            </div>
            <div class="input-box w50">
                <input type="text" id="nom" name="nom" required />
                <label for="nom">Nom</label>
                
            </div>
            <div class="input-box w100">
                <input type="text" id="email" name="email" required />
                <label for="email">Email</label>
                
            </div>
            <div class="input-box w100">
                <textarea id="message" name="message" required></textarea>
                <label for="message">Message</label>
                
            </div>
            <div class="input-box w100">
                <select id="sujet" name="sujet">
                    <option value="">Choisissez un sujet</option>
                    <option value="support">Support</option>
                    <option value="devis">Demande de devis</option>
                </select>
                <label for="sujet">Sujet</label>
            </div>
            <div class="input-box w100">
                <input type="file" id="cv" name="cv" />
                <label for="cv">Joindre un fichier</label>
            </div>
            <div class="input-box w100">
                <input type="date" id="date" name="date" />
                <label for="date">Date souhaitée</label>
            </div>
            <div class="input-box w100">
                <input type="checkbox" id="rgpd" name="rgpd" required />
                <label for="rgpd">J’accepte les conditions</label>

            </div>
        </div>
    </div>
  </div>
</section>
