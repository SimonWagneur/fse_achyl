import { registerBlockType } from '@wordpress/blocks';
const { RichText, InnerBlocks } = wp.blockEditor;



function EditComponent({ attributes, setAttributes }) {
    const { title } = attributes;
    const ALLOWED_BLOCKS = ['blocktheme/card-project'];
    const TEMPLATE = [
        ['blocktheme/card-project'],
        ['blocktheme/card-project'],
        ['blocktheme/card-project']
    ];

    return (
        <section className="section-projects">
            <div className="container medium-container slider-container">
                <div className="top">
                    <RichText
                        tagName="h2"
                        className="h2"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder="Entrez le titre de la section..."
                    />
                    <div className="controls">
                        <div className="control prev disabled"><i className="fa-solid fa-arrow-left"></i></div>
                        <div className="control next"><i className="fa-solid fa-arrow-right"></i></div>
                    </div>
                </div>
                <div className="slider bottom">
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
    return <InnerBlocks.Content />
}

registerBlockType('blocktheme/section-projects', {
    attributes: {
        anchor: { type: "string" },
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