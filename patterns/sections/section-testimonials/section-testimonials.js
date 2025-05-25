import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

registerBlockType("blocktheme/section-testimonials", {
    title: "Section Testimonials",
    attributes: {
        title: {
            type: "string",
            default: "Nos avis clients"
        }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const ALLOWED_BLOCKS = ['blocktheme/card-testimonial'];
    const TEMPLATE = [
        ['blocktheme/card-testimonial'],
        ['blocktheme/card-testimonial'],
        ['blocktheme/card-testimonial']
    ];

    return (
        <>
            {/* Render */}
            <section {...blockProps} id="avis" className="section-testimonials">
                <div className="container medium-container slider-container">
                    <div className="top">
                        <RichText
                            tagName="h2"
                            className="h2"
                            value={attributes.title}
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
                            template={TEMPLATE}
                            renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

function SaveComponent({ attributes }) {
  return <InnerBlocks.Content />
}

