<?php
/**
 * Title: Section Recent Posts
 * Slug: blocktheme/section-recent-posts
 * Categories: sections
 * Description: Section articles récents avec titre et contenu.
 */
$posts_per_page = $attributes['postsPerPage'] ?? 10;
$show_excerpt = $attributes['showExcerpt'] ?? true;
$title = $attributes['title'] ?? 'Articles Récents';
$anchor = $attributes['anchor'] ?? '';

$args = array(
    'post_type' => 'post',
    'posts_per_page' => $posts_per_page,
    'orderby' => 'date',
    'order' => 'DESC'
);

$recent_posts = new WP_Query($args);
?>

<section class="section-recent-posts" <?php echo !empty($anchor) ? ' id="' . esc_attr($anchor) . '"' : ''; ?>>
    <div class="container medium-container">
        <h2 class="h2"><?php echo esc_html($title); ?></h2>

        <div class="posts-grid" data-posts-per-page="<?php echo esc_attr($posts_per_page); ?>" data-total-posts="<?php echo esc_attr($recent_posts->found_posts); ?>">
            <?php if ($recent_posts->have_posts()) : while ($recent_posts->have_posts()) : $recent_posts->the_post(); ?>
                <article class="post-card">
                    <div class="post-thumbnail">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('large'); ?>
                        <?php endif; ?>
                    </div>
                    
                    <div class="post-content">
                        <h3 class="h3"><?php the_title(); ?></h3>
                        <?php if ($show_excerpt) : ?>
                            <div class="excerpt">
                                <?php the_excerpt(); ?>
                            </div>
                        <?php endif; ?>
                        
                        <?php
                        echo do_blocks('<!-- wp:blocktheme/button {
                            "text": "Voir l\'article",
                            "link": "' . esc_url(get_permalink()) . '",
                            "className": "primary black"
                        } /-->');
                        ?>
                    </div>
                </article>
            <?php endwhile; endif; ?>
            <?php wp_reset_postdata(); ?>
        </div>

        <?php if ($recent_posts->found_posts > $posts_per_page) : ?>
            <div class="load-more">
                <button class="secondary black js-load-more">
                    Voir plus d'articles
                </button>
            </div>
        <?php endif; ?>
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.querySelector('.js-load-more');
    if (!loadMoreBtn) return;

    let currentPage = 1;
    const postsGrid = document.querySelector('.posts-grid');
    const postsPerPage = parseInt(postsGrid.dataset.postsPerPage);
    const totalPosts = parseInt(postsGrid.dataset.totalPosts);

    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        
        fetch(`/wp-json/wp/v2/posts?page=${currentPage}&per_page=${postsPerPage}&_embed`)
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const article = document.createElement('article');
                    article.className = 'post-card';
                    
                    // Toujours créer la div thumbnail
                    let thumbnailHtml = '<div class="post-thumbnail">';
                    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
                        thumbnailHtml += `
                            <img src="${post._embedded['wp:featuredmedia'][0].source_url}" alt="${post.title.rendered}">
                        `;
                    }
                    thumbnailHtml += '</div>';

                    let excerptHtml = '';
                    if (<?php echo $show_excerpt ? 'true' : 'false'; ?>) {
                        excerptHtml = `
                            <div class="excerpt">
                                ${post.excerpt.rendered}
                            </div>
                        `;
                    }

                    // Utiliser le bloc button
                    const buttonHtml = `<!-- wp:blocktheme/button {
                        "text": "Voir l'article",
                        "link": "${post.link}",
                        "className": "primary black"
                    } -->`;

                    article.innerHTML = `
                        ${thumbnailHtml}
                        <div class="post-content">
                            <h3 class="h3">${post.title.rendered}</h3>
                            ${excerptHtml}
                            ${buttonHtml}
                        </div>
                    `;
                    
                    postsGrid.appendChild(article);
                });

                if (currentPage * postsPerPage >= totalPosts) {
                    loadMoreBtn.parentElement.remove();
                }
            });
    });
});
</script> 