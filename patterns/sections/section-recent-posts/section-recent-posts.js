const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, useBlockProps, InnerBlocks } = wp.blockEditor;
const { PanelBody, RangeControl, ToggleControl } = wp.components;
const { useState, useEffect } = wp.element;
const { useSelect } = wp.data;
const { createBlock } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType("blocktheme/section-recent-posts", {
    title: "Section Articles Récents",
    supports: {
        align: ["full"],
        html: false
    },
    attributes: {
        title: {
            type: "string",
            default: "Articles Récents"
        },
        postsPerPage: {
            type: "number",
            default: 10
        },
        showExcerpt: {
            type: "boolean",
            default: true
        }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const { title, postsPerPage, showExcerpt } = attributes;
    const [currentPage, setCurrentPage] = useState(1);

    const posts = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'post', {
            per_page: postsPerPage,
            page: currentPage,
            _embed: true,
            orderby: 'date',
            order: 'desc'
        });
    }, [currentPage, postsPerPage]);

    const totalPosts = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'post', {
            per_page: -1
        })?.length;
    }, []);

    const hasMorePosts = totalPosts > currentPage * postsPerPage;

    return (
        <>
            <InspectorControls>
                <PanelBody title="Paramètres" initialOpen={true}>
                    <RangeControl
                        label="Articles par page"
                        value={postsPerPage}
                        onChange={(value) => setAttributes({ postsPerPage: value })}
                        min={1}
                        max={20}
                    />
                    <ToggleControl
                        label="Afficher les extraits"
                        checked={showExcerpt}
                        onChange={(value) => setAttributes({ showExcerpt: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <section className="section-recent-posts">
                <div className="container">
                    <RichText
                        tagName="h2"
                        className="h2"
                        value={title}
                        onChange={(title) => setAttributes({ title })}
                        placeholder="Titre de la section..."
                    />

                    <div className="posts-grid">
                        {posts?.map((post) => (
                            <article key={post.id} className="post-card">
                                <div className="post-thumbnail">
                                    {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                                        <img 
                                            src={post._embedded['wp:featuredmedia'][0].source_url}
                                            alt={post.title.rendered}
                                        />
                                    )}
                                </div>
                                <div className="post-content">
                                    <h3 className="h3" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h3>
                                    {showExcerpt && (
                                        <div 
                                            className="excerpt"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                        ></div>
                                    )}
                                    <InnerBlocks 
                                        template={[
                                            ['blocktheme/button', {
                                                text: "Voir l'article",
                                                link: post.link,
                                                className: "primary black"
                                            }]
                                        ]}
                                        templateLock="all"
                                    />
                                </div>
                            </article>
                        ))}
                    </div>

                    {hasMorePosts && (
                        <div className="load-more">
                            <button 
                                className="secondary black"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                Voir plus d'articles
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

function SaveComponent() {
    return null;
} 