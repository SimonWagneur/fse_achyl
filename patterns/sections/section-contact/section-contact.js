import { RichText, MediaUpload, MediaUploadCheck, InnerBlocks } from "@wordpress/block-editor"
import { Button } from "@wordpress/components"
import { useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from '@wordpress/blocks';



function EditComponent({ attributes, setAttributes }) {
    const blockProps = useBlockProps();

    return (
        <section className="section-contact">
            <div className="container medium-container">
                <div className="left">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ imageUrl: media.url })}
                            allowedTypes={["image"]}
                            value={attributes.imageUrl}
                            render={({ open }) => (
                                <div className="image-container">
                                    {attributes.imageUrl ? (
                                        <>
                                            <img 
                                                src={attributes.imageUrl} 
                                                alt="Image de contact" 
                                            />
                                            <div className="button-container">
                                                <Button 
                                                    onClick={open}
                                                    isSecondary
                                                >
                                                    Remplacer l'image
                                                </Button>
                                                <Button 
                                                    onClick={() => setAttributes({ imageUrl: '' })}
                                                    isDestructive
                                                >
                                                    Supprimer
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={open}
                                            isPrimary
                                        >
                                            Ajouter une image
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                </div>
                <div className="right">
                    <div className="form-inner">
                        <RichText
                            tagName="h2"
                            value={attributes.title}
                            onChange={(title) => setAttributes({ title })}
                            placeholder="Titre de la section..."
                        />
                        <RichText
                            tagName="p"
                            value={attributes.description}
                            onChange={(description) => setAttributes({ description })}
                            placeholder="Description de la section..."
                        />
                        <InnerBlocks 
                            allowedBlocks={['blocktheme/form']}
                            template={[['blocktheme/form']]}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

function SaveComponent() {
    return <InnerBlocks.Content />
}

registerBlockType("blocktheme/section-contact", {
    title: "Section Contact",
    "supports": {
        "html": false,
        "anchor": true
    },
    attributes: {
        anchor: { type: "string" },
        imageUrl: { type: "string", default: "" },
        title: { type: "string", default: "Contactez-nous" },
        description: { type: "string", default: "Remplissez le formulaire ci-dessous pour nous contacter." }
    },
    edit: EditComponent,
    save: SaveComponent
})