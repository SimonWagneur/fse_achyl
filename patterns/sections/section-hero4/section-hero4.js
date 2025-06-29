import { InnerBlocks, RichText, useBlockProps, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Button, PanelBody, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';



function EditComponent({ attributes, setAttributes }) {
    const ALLOWED_BLOCKS = ['blocktheme/button'];
    const TEMPLATE = [
        ['blocktheme/button', {}]
    ];
    const [videoLoading, setVideoLoading] = useState(false);

    const onSelectImage = (media) => {
        setAttributes({
            backgroundType: 'image',
            backgroundImageUrl: media.url,
            backgroundImageId: media.id,
            backgroundImageAlt: media.alt || '',
            backgroundVideoUrl: '',
            backgroundVideoId: 0,
            backgroundVideoImageUrl: ''
        });
    };

    const onSelectVideo = (media) => {
        setAttributes({
            backgroundType: 'video',
            backgroundVideoUrl: media.url,
            backgroundVideoId: media.id,
            backgroundImageUrl: '',
            backgroundImageId: 0,
            backgroundImageAlt: '',
            backgroundVideoImageUrl: ''
        });
        setVideoLoading(true);
    };

    const onSelectVideoBackgroundImage = (media) => {
        setAttributes({
            backgroundVideoImageUrl: media.url,
            backgroundVideoImageId: media.id
        });
    };

    const removeVideoBackgroundImage = () => {
        setAttributes({
            backgroundVideoImageUrl: '',
            backgroundVideoImageId: 0
        });
    };

    const handleVideoLoad = () => {
        setVideoLoading(false);
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Alignements">
                    <SelectControl
                        label="Alignement horizontal"
                        value={attributes.horizontalAlignment}
                        options={[
                            { label: 'Gauche', value: 'hleft' },
                            { label: 'Centre', value: 'hcenter' },
                            { label: 'Droite', value: 'hright' }
                        ]}
                        onChange={horizontalAlignment => setAttributes({ horizontalAlignment })}
                    />
                    <SelectControl
                        label="Alignement vertical"
                        value={attributes.verticalAlignment}
                        options={[
                            { label: 'Haut', value: 'vtop' },
                            { label: 'Centre', value: 'vcenter' },
                            { label: 'Bas', value: 'vbottom' }
                        ]}
                        onChange={verticalAlignment => setAttributes({ verticalAlignment })}
                    />
                </PanelBody>
                <PanelBody title="Média de fond">
                    <SelectControl
                        label="Type de média"
                        value={attributes.backgroundType}
                        options={[
                            { label: 'Aucun', value: 'none' },
                            { label: 'Image', value: 'image' },
                            { label: 'Vidéo', value: 'video' }
                        ]}
                        onChange={backgroundType => setAttributes({ backgroundType })}
                    />
                    
                    {attributes.backgroundType === 'image' && (
                        <div className="media-selection-hero4">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={attributes.backgroundImageId}
                                    render={({ open }) => (
                                        <div className="media-preview">
                                            {attributes.backgroundImageUrl && (
                                                <img
                                                    src={attributes.backgroundImageUrl}
                                                    alt={attributes.backgroundImageAlt}
                                                />
                                            )}
                                            <Button
                                                onClick={open}
                                                variant="primary"
                                                className="media-button"
                                            >
                                                {attributes.backgroundImageUrl ? 'Changer l\'image' : 'Sélectionner une image'}
                                            </Button>
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    )}

                    {attributes.backgroundType === 'video' && (
                        <div className="media-selection-hero4">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectVideo}
                                    allowedTypes={['video']}
                                    value={attributes.backgroundVideoId}
                                    render={({ open }) => (
                                        <div className="media-preview">
                                            {attributes.backgroundVideoUrl && (
                                                <video
                                                    src={attributes.backgroundVideoUrl}
                                                    controls
                                                />
                                            )}
                                            <Button
                                                onClick={open}
                                                variant="primary"
                                                className="media-button"
                                            >
                                                {attributes.backgroundVideoUrl ? 'Changer la vidéo' : 'Sélectionner une vidéo'}
                                            </Button>
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                            
                            {/* Sélection de l'image de fond pour la vidéo */}
                            <div className="video-background-image-selection" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                                    Image de fond pendant le chargement de la vidéo
                                </p>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectVideoBackgroundImage}
                                        allowedTypes={['image']}
                                        value={attributes.backgroundVideoImageId}
                                        render={({ open }) => (
                                            <div className="media-preview">
                                                {attributes.backgroundVideoImageUrl && (
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <img
                                                            src={attributes.backgroundVideoImageUrl}
                                                            alt="Image de fond vidéo"
                                                            style={{ width: '100%', height: 'auto' }}
                                                        />
                                                        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                                                            <Button
                                                                onClick={open}
                                                                variant="secondary"
                                                                size="small"
                                                            >
                                                                Modifier l'image
                                                            </Button>
                                                            <Button
                                                                onClick={removeVideoBackgroundImage}
                                                                variant="destructive"
                                                                size="small"
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                                {!attributes.backgroundVideoImageUrl && (
                                                    <Button
                                                        onClick={open}
                                                        variant="secondary"
                                                        size="small"
                                                    >
                                                        Choisir une image de fond
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </div>
                        </div>
                    )}
                </PanelBody>
            </InspectorControls>

            <section className={`section-hero4 hero ${attributes.horizontalAlignment} ${attributes.verticalAlignment}`}>
                <div className="background">
                    {attributes.backgroundType === 'image' && attributes.backgroundImageUrl && (
                        <img
                            src={attributes.backgroundImageUrl}
                            alt={attributes.backgroundImageAlt}
                        />
                    )}
                    {attributes.backgroundType === 'video' && attributes.backgroundVideoUrl && (
                        <>
                            {videoLoading && (
                                <div className="video-loading" style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'black',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1
                                }}>
                                    {attributes.backgroundVideoImageUrl ? (
                                        <img
                                            src={attributes.backgroundVideoImageUrl}
                                            alt="Image de fond"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                    )}
                                </div>
                            )}
                            <video
                                src={attributes.backgroundVideoUrl}
                                autoPlay
                                muted
                                loop
                                onLoadedData={handleVideoLoad}
                                style={{ position: 'relative', zIndex: videoLoading ? 0 : 1 }}
                            />
                        </>
                    )}
                </div>
                <div className="overlay-filter"></div>
                <div className="content">
                    <RichText
                        tagName="h1"
                        value={attributes.title}
                        onChange={title => setAttributes({ title })}
                        placeholder="Votre titre ici"
                    />
                    <RichText
                        tagName="p"
                        value={attributes.text}
                        onChange={text => setAttributes({ text })}
                        placeholder="Votre texte descriptif ici"
                    />
                    <InnerBlocks 
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                    />
                </div>
            </section>
        </>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />
}

registerBlockType('blocktheme/section-hero4', {
    edit: EditComponent,
    save: SaveComponent
});