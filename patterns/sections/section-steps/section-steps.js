import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";

registerBlockType("blocktheme/section-steps", {
    title: "Section Steps",
    supports: {
        align: ["full"],
        html: false,
        anchor: true
    },
    attributes: {
        title: {
            type: "string",
            default: ""
        },
        anchor: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const { title } = attributes;
    const blockProps = useBlockProps();

    const ALLOWED_BLOCKS = ['blocktheme/card-step'];
    const TEMPLATE = [
        ['blocktheme/card-step'],
        ['blocktheme/card-step'],
        ['blocktheme/card-step']
    ];

    return (
        <section className="section-steps">
            <div className="container medium-container slider-container">
                <div className="top">
                    <RichText
                        tagName="h2"
                        className="h2"
                        value={title}
                        onChange={(title) => setAttributes({ title })}
                        placeholder="Titre de la section..."
                    />
                    <div className="controls">
                        <div className="control prev disabled">
                            <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                        </div>
                        <div className="control next">
                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="slider bottom">
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
    return <InnerBlocks.Content />;
}

