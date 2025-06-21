import { registerBlockType } from '@wordpress/blocks';
const { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, SelectControl } = wp.components;

function EditComponent({ attributes, setAttributes }) {
    const { heading, imageUrl, reversed, themeMode } = attributes;

    const ALLOWED_BLOCKS = [
        'blocktheme/button',
        'blocktheme/card-feature'
    ];
    const TEMPLATE = [
        ['blocktheme/button', {}]
    ];

    // Fonction pour gérer la sélection du média
    const handleMediaSelect = (media) => {
        setAttributes({ 
            imageUrl: media.url
        });
    };

    // Fonction pour supprimer le média
    const removeMedia = () => {
        setAttributes({ 
            imageUrl: ''
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
            </InspectorControls>

            <section className={`section-benefits3 ${reversed ? 'reversed' : ''} ${themeMode === 'dark' ? 'dark-mode' : ''}`}>
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
                                    allowedTypes={['image']}
                                    value={imageUrl}
                                    render={({ open }) => (
                                        <>
                                            {imageUrl ? (
                                                <>
                                                    <img 
                                                        id="heroBackground" 
                                                        src={imageUrl} 
                                                        alt="Background" 
                                                    />
                                                    <div className="media-buttons" style={{ position: "absolute", top: 0, right: 0 }}>
                                                        <Button onClick={open} isSecondary style={{ marginRight: '5px' }}>
                                                            Modifier l'image
                                                        </Button>
                                                        <Button onClick={removeMedia} isDestructive>
                                                            Supprimer
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="media-placeholder" style={{ textAlign: 'center', padding: '20px' }}>
                                                    <Button onClick={open} isSecondary>
                                                        Ajouter une image
                                                    </Button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>
            </section>
        </>
    );
}

function SaveComponent({ attributes }) {
    return <InnerBlocks.Content />;
}

registerBlockType('blocktheme/section-benefits3', {
    "supports": {
        "html": false,
        "anchor": true
    },
    attributes: {
        heading: {
            type: 'string'
        },
        imageUrl: {
            type: 'string',
            default: ''
        },
        reversed: {
            type: 'boolean',
            default: false
        },
        themeMode: {
            type: 'string',
            default: 'light'
        }
    },
    edit: EditComponent,
    save: SaveComponent
});