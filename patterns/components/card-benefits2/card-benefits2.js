const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { PanelBody, TextControl, Button } = wp.components;

registerBlockType('blocktheme/card-benefits2', {
    parent: ['blocktheme/section-benefits2'],
    attributes: {
        title: {
            type: "string",
            default: "Titre de la carte"
        },
        text: {
            type: "string",
            default: "Texte de la carte"
        },
        imageUrl: {
            type: "string",
            default: ""
        }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const { title, text, imageUrl, position } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title="Titre" initialOpen={true}>
                    <TextControl
                        label="Titre"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder="Entrez le titre..."
                    />
                </PanelBody>
                <PanelBody title="Description" initialOpen={true}>
                    <TextControl
                        label="Texte"
                        value={text}
                        onChange={(value) => setAttributes({ text: value })}
                        placeholder="Entrez le texte..."
                    />
                </PanelBody>
                <PanelBody title="Image" initialOpen={true}>
                    <div className="editor-post-featured-image">
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ imageUrl: media.url })}
                                allowedTypes={['image']}
                                value={imageUrl}
                                render={({ open }) => (
                                    <div>
                                        {imageUrl ? (
                                            <div>
                                                <img 
                                                    src={imageUrl} 
                                                    alt="Image de la carte" 
                                                    style={{ maxWidth: '100%', marginBottom: '10px' }}
                                                />
                                                <Button 
                                                    onClick={open}
                                                    isSecondary
                                                >
                                                    Remplacer l'image
                                                </Button>
                                                <Button 
                                                    onClick={() => setAttributes({ imageUrl: '' })}
                                                    isDestructive
                                                    style={{ marginLeft: '10px' }}
                                                >
                                                    Supprimer l'image
                                                </Button>
                                            </div>
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
                </PanelBody>
            </InspectorControls>

            <div className="slide" data-position={position}>
                <div className="title">{title}</div>
                <div className="text">
                    <p>{text}</p>
                </div>
                <div className="img">
                    {imageUrl && imageUrl}
                </div>
            </div>
        </>
    );
}

function SaveComponent() {
    return null;
}

