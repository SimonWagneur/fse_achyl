const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.blockEditor;

registerBlockType('blocktheme/section-features', {
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

function EditComponent({ attributes, setAttributes }) {
    const { title } = attributes;
    const ALLOWED_BLOCKS = ['blocktheme/card-feature'];
    const TEMPLATE = [
        ['blocktheme/card-feature'],
        ['blocktheme/card-feature'],
        ['blocktheme/card-feature']
    ];

    return (
        <section className="section-features">
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

