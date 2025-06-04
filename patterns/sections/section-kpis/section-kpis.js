import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('blocktheme/section-kpis', {
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const ALLOWED_BLOCKS = ['blocktheme/card-kpi'];
    const TEMPLATE = [
        ['blocktheme/card-kpi', {}],
        ['blocktheme/card-kpi', {}],
        ['blocktheme/card-kpi', {}]
    ];

    return (
        <section className="section-kpi">
            <div className="container medium-container">
                <RichText
                    tagName="h2"
                    value={attributes.title}
                    onChange={title => setAttributes({ title })}
                    placeholder="Entrez le titre de la section"
                />
                <div className="kpis">
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>
            </div>
        </section>
    );
}

function SaveComponent() {
  return <InnerBlocks.Content />
}

