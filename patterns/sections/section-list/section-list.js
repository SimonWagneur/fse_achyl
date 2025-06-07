import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from "@wordpress/block-editor";



function EditComponent({ attributes, setAttributes }) {
    const { title } = attributes;

    const ALLOWED_BLOCKS = ['blocktheme/card-list'];
    const TEMPLATE = [
        ['blocktheme/card-list'],
        ['blocktheme/card-list'],
        ['blocktheme/card-list']
    ];

    return (
        <section className="section-list">
            <div className="container medium-container">
                <RichText
                    tagName="h2"
                    className="h2"
                    value={title}
                    onChange={(title) => setAttributes({ title })}
                    placeholder="Votre titre ici..."
                />
                <div className="content">
                    <div className="left">
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={TEMPLATE}
                            templateLock={false}
                        />
                    </div>
                    <div className="right">
                        <div className="canvas">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />;
}

registerBlockType("blocktheme/section-list", {
    title: "Section List",
    supports: {
        align: ["full"],
        html: false,
        anchor: true
    },
    attributes: {
        title: {
            type: "string",
            default: "Votre titre ici"
        },
        anchor: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent
});