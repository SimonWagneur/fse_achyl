import { registerBlockType } from '@wordpress/blocks';
const { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl } = wp.components;

function EditComponent({ attributes, setAttributes }) {
    const { heading, paragraph, imageUrl, mediaType, reversed, animation, scrollingText, themeMode, backgroundImageUrl } = attributes;

    const ALLOWED_BLOCKS = [
        'blocktheme/button',
        'blocktheme/card-feature'
    ];
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

    // Fonction pour gérer la sélection de l'image de fond
    const handleBackgroundImageSelect = (media) => {
        setAttributes({ backgroundImageUrl: media.url });
    };

    // Fonction pour supprimer le média
    const removeMedia = () => {
        setAttributes({ 
            imageUrl: '',
            animation: '',
            mediaType: 'image',
            backgroundImageUrl: ''
        });
    };

    // Fonction pour supprimer l'image de fond
    const removeBackgroundImage = () => {
        setAttributes({ backgroundImageUrl: '' });
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
                <PanelBody title="Options de thème">
                    <SelectControl
                        label="Mode de thème"
                        value={themeMode}
                        options={[
                            { label: 'Mode clair', value: 'light' },
                            { label: 'Mode sombre', value: 'dark' }
                        ]}
                        onChange={(value) => setAttributes({ themeMode: value })}
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
                {mediaType === 'video' && (
                    <PanelBody title="Image de fond pour la vidéo">
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                            Cette image sera affichée pendant le chargement de la vidéo
                        </p>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={handleBackgroundImageSelect}
                                allowedTypes={['image']}
                                value={backgroundImageUrl}
                                render={({ open }) => (
                                    <>
                                        {backgroundImageUrl ? (
                                            <div style={{ marginBottom: '10px' }}>
                                                <img 
                                                    src={backgroundImageUrl} 
                                                    alt="Image de fond" 
                                                    style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                                                />
                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    <Button onClick={open} isSecondary size="small">
                                                        Modifier l'image
                                                    </Button>
                                                    <Button onClick={removeBackgroundImage} isDestructive size="small">
                                                        Supprimer
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button onClick={open} isSecondary>
                                                Choisir une image de fond
                                            </Button>
                                        )}
                                    </>
                                )}
                            />
                        </MediaUploadCheck>
                    </PanelBody>
                )}
            </InspectorControls>

            <section className={`section-benefits1 ${reversed ? 'reversed' : ''} ${animation} ${mediaType === 'video' ? 'has-video' : ''} ${themeMode === 'dark' ? 'dark-mode' : ''}`}>
                <div className="container medium-container">
                    <div className="left">
                        <RichText
                            tagName="h2"
                            className="h2"
                            value={heading}
                            onChange={(newHeading) => setAttributes({ heading: newHeading })}
                            placeholder="Entrez le titre..."
                        />
                        <div className="content">
                            <InnerBlocks
                                allowedBlocks={['core/paragraph', 'blocktheme/card-feature', 'blocktheme/button']}
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
                                                        <div style={{ position: 'relative' }}>
                                                            {backgroundImageUrl && (
                                                                <img 
                                                                    src={backgroundImageUrl} 
                                                                    alt="Image de fond" 
                                                                    style={{ 
                                                                        position: 'absolute', 
                                                                        top: 0, 
                                                                        left: 0, 
                                                                        width: '100%', 
                                                                        height: '100%', 
                                                                        objectFit: 'cover',
                                                                        zIndex: 1
                                                                    }}
                                                                />
                                                            )}
                                                            <video 
                                                                id="heroBackground"
                                                                src={imageUrl}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                                style={{ 
                                                                    position: 'relative', 
                                                                    zIndex: 2,
                                                                    width: '100%',
                                                                    height: 'auto'
                                                                }}
                                                            />
                                                        </div>
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

registerBlockType('blocktheme/section-benefits1', {
    "supports": {
        "html": false,
        "anchor": true
    },
    attributes: {
        anchor: { type: "string" },
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
        backgroundImageUrl: {
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
        },
        themeMode: {
            type: 'string',
            default: 'light'
        }
    },
    edit: EditComponent,
    save: SaveComponent
});