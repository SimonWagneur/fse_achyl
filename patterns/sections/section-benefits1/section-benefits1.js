const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl } = wp.components;

registerBlockType('blocktheme/section-benefits1', {
    "supports": {
        "html": false,
        "anchor": true
    },
    attributes: {
        heading: {
            type: 'string'
        },
        paragraph: {
            type: 'string'
        },
        imageUrl: {
            type: 'string',
            default: ''
        },
        mediaType: {
            type: 'string',
            default: 'image'
        },
        reversed: {
            type: 'boolean',
            default: false
        },
        animation: {
            type: 'string',
            default: ''
        },
        scrollingText: {
            type: 'string'
        }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const { heading, paragraph, imageUrl, mediaType, reversed, animation, scrollingText } = attributes;

    const ALLOWED_BLOCKS = ['blocktheme/button'];
    const TEMPLATE = [
        ['blocktheme/button', {}]
    ];

    const imageAnimations = [
        {id: "", name: "Aucune animation"},
        {id: "scrollingText", name: "Défilement de texte"},
        {id: "scrollingHorizontal", name: "Défilement horizontal"},
        {id: "scrollingVertical", name: "Défilement vertical"},
        {id: "scrollingToggle", name: "Bouton actif/inactif"},
    ];

    const videoAnimations = [
        {id: "", name: "Aucune animation"},
        // {id: "scrollingVideo", name: "Défilement de vidéo"},
    ];

    // Fonction pour gérer la sélection du média
    const handleMediaSelect = (media) => {
        const newMediaType = media.type === 'video' ? 'video' : 'image';
        setAttributes({ 
            imageUrl: media.url,
            mediaType: newMediaType,
            // Si c'est une vidéo, on force l'animation scrollingVideo
            animation: newMediaType === 'video' ? 'scrollingVideo' : ''
        });
    };

    // Fonction pour supprimer le média
    const removeMedia = () => {
        setAttributes({ 
            imageUrl: '',
            animation: '',
            mediaType: 'image'
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Options de mise en page">
                    <SelectControl
                        label="Position du média"
                        value={reversed ? 'left' : 'right'}
                        options={[
                            { label: 'Média à droite', value: 'right' },
                            { label: 'Média à gauche', value: 'left' }
                        ]}
                        onChange={(value) => setAttributes({ reversed: value === 'left' })}
                    />
                </PanelBody>
                <PanelBody title="Options d'animation">
                    <SelectControl
                        label="Type d'animation"
                        value={animation}
                        options={mediaType === 'video' ? videoAnimations.map(anim => ({ label: anim.name, value: anim.id })) : imageAnimations.map(anim => ({ label: anim.name, value: anim.id }))}
                        onChange={(value) => setAttributes({ animation: value })}
                    />
                    {mediaType === 'image' && animation === 'scrollingText' && (
                        <TextControl
                            label="Texte défilant"
                            value={scrollingText}
                            onChange={(value) => setAttributes({ scrollingText: value })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <section className={`section-benefits1 ${reversed ? 'reversed' : ''} ${animation} ${mediaType === 'video' ? 'has-video' : ''}`}>
                <div className="container medium-container">
                    <div className="left">
                        <RichText
                            tagName="h2"
                            className="h2"
                            value={heading}
                            onChange={(newHeading) => setAttributes({ heading: newHeading })}
                            placeholder="Entrez le titre..."
                        />
                        <RichText
                            tagName="p"
                            className="p"
                            value={paragraph}
                            onChange={(newParagraph) => setAttributes({ paragraph: newParagraph })}
                            placeholder="Entrez le contenu..."
                        />
                        <div className="buttons">
                            <InnerBlocks
                                allowedBlocks={ALLOWED_BLOCKS}
                                renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div className="canvas">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={handleMediaSelect}
                                    allowedTypes={['image', 'video']}
                                    value={imageUrl}
                                    render={({ open }) => (
                                        <>
                                            {imageUrl ? (
                                                <>
                                                    {mediaType === 'image' ? (
                                                        <img 
                                                            id="heroBackground" 
                                                            src={imageUrl} 
                                                            alt="Background" 
                                                        />
                                                    ) : (
                                                        <video 
                                                            id="heroBackground"
                                                            src={imageUrl}
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                        />
                                                    )}
                                                    <div className="media-buttons" style={{ position: "absolute", top: 0, right: 0 }}>
                                                        <Button onClick={open} isSecondary style={{ marginRight: '5px' }}>
                                                            Modifier le média
                                                        </Button>
                                                        <Button onClick={removeMedia} isDestructive>
                                                            Supprimer
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="media-placeholder" style={{ textAlign: 'center', padding: '20px' }}>
                                                    <Button onClick={open} isSecondary>
                                                        Ajouter une image ou une vidéo
                                                    </Button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                />
                            </MediaUploadCheck>
                            {mediaType === 'image' && animation === 'scrollingText' && scrollingText && (
                                <p className="scrolling-text">{scrollingText}</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function SaveComponent({ attributes }) {
    return <InnerBlocks.Content />;
}

