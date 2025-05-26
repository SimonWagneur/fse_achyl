import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

registerBlockType("blocktheme/section-faq", {
    title: "Section FAQ",
    "supports": {
        "html": false,
        "anchor": true
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
    const blockProps = useBlockProps();
    const ALLOWED_BLOCKS = ['blocktheme/card-faq'];
    const TEMPLATE = [
        ['blocktheme/card-faq'],
        ['blocktheme/card-faq'],
        ['blocktheme/card-faq']
    ];

    return (
        <>
            {/* Render */}
            <section {...blockProps} className="faq">
                <div className="container small-container">
                    <RichText
                        tagName="h2"
                        className="h2"
                        value={attributes.title}
                        onChange={(title) => setAttributes({ title })}
                        placeholder="FAQ"
                    />
                    <InnerBlocks 
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>
            </section>
        </>
    );
}

function SaveComponent({ attributes }) {
  return <InnerBlocks.Content />
}

