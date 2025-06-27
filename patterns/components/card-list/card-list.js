import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText, MediaUpload, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";



function EditComponent({ attributes, setAttributes }) {
    const { backgroundImage, title, content } = attributes;
    const blockProps = useBlockProps();
    return (
        <>
            <InspectorControls>
                <PanelBody title="Image" initialOpen={true}>
                    <div className="editor-post-featured-image">
                        <MediaUpload
                            onSelect={media => setAttributes({ backgroundImage: media.url })}
                            type="image"
                            value={backgroundImage}
                            render={({ open }) => (
                                <div>
                                    <Button
                                        onClick={open}
                                        className={!backgroundImage ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                                    >
                                        {!backgroundImage ? "Ajouter une image" : (
                                            <img src={backgroundImage} alt="Image aperçu" style={{ maxWidth: '100%' }} />
                                        )}
                                    </Button>
                                    {backgroundImage && (
                                        <>
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                                isSmall
                                                className="is-secondary"
                                            >
                                                Remplacer l'image
                                            </Button>
                                            <Button
                                                onClick={() => setAttributes({ backgroundImage: '' })}
                                                variant="link"
                                                isDestructive
                                                isSmall
                                            >
                                                Supprimer l'image
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
            <div 
                className="card-list" 
                data-url={backgroundImage}
            >
                <RichText
                    tagName="h3"
                    className="h3"
                    value={title}
                    onChange={title => setAttributes({ title })}
                    placeholder="Titre"
                />
                <RichText
                    tagName="p"
                    className="p"
                    value={content}
                    onChange={content => setAttributes({ content })}
                    placeholder="Texte"
                />
            </div>
            </div>
        </>
    );
}

function SaveComponent({ attributes }) {
  // return <InnerBlocks.Content />
}


registerBlockType("blocktheme/card-list", {
    parent: ['blocktheme/section-list'],
    title: "Card List",
    supports: {
        align: ["left", "center", "right"]
    },
    attributes: {
        backgroundImage: { type: "string", default: "" },
        title: { type: "string", default: "" },
        content: { type: "string", default: "" }
    },
    edit: EditComponent,
    save: () => null
});