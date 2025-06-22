import { registerBlockType } from '@wordpress/blocks';
const { RichText, InnerBlocks } = wp.blockEditor;



function EditComponent({ attributes, setAttributes }) {
    const { title } = attributes;
    const ALLOWED_BLOCKS = ['blocktheme/card-pricing'];
    const TEMPLATE = [
        ['blocktheme/card-pricing'],
        ['blocktheme/card-pricing'],
        ['blocktheme/card-pricing']
    ];

    return (
        <section className="section-pricing">
            <div className="container medium-container">
                <RichText
                    tagName="h2"
                    className="h2"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder="Entrez le titre de la section..."
                />
                <div className="content">
                    <InnerBlocks 
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>
            </div>
        </section>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />;
}

registerBlockType('blocktheme/section-pricing', {
    attributes: {
        title: {
            type: "string",
            default: ""
        },
        anchor: { type: "string" }
    },
    "supports": {
        "html": false,
        "anchor": true
    },
    edit: EditComponent,
    save: SaveComponent
});