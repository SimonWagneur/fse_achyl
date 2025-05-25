import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

registerBlockType("blocktheme/section-faq", {
    title: "Section FAQ",
    attributes: {
        title: {
            type: "string",
            default: "FAQ"
        }
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
            <section {...blockProps} id="faq" className="faq">
                <div className="container small-container">
                    <RichText
                        tagName="h2"
                        className="h2"
                        value={attributes.title}
                        onChange={(title) => setAttributes({ title })}
                        placeholder="Titre de la section..."
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

