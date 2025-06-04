import { RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Button, TextControl } from '@wordpress/components';

registerBlockType('blocktheme/section-gallery', {
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const onSelectMedia = (media) => {
        // Convertir les nouveaux médias au format souhaité
        const newMediaItems = media.map(item => ({
            id: item.id,
            url: item.url,
            type: item.type || (item.mime_type && item.mime_type.startsWith('video/') ? 'video' : 'image'),
            alt: item.alt || '',
            link: '' // Toujours initialiser le lien comme vide
        }));

        // Fusionner avec les médias existants en évitant les doublons
        const existingIds = attributes.mediaItems.map(item => item.id);
        const uniqueNewMedia = newMediaItems.filter(item => !existingIds.includes(item.id));
        
        setAttributes({ 
            mediaItems: [...attributes.mediaItems, ...uniqueNewMedia]
        });
    };

    const updateItemLink = (index, link) => {
        const newMediaItems = [...attributes.mediaItems];
        newMediaItems[index] = {
            ...newMediaItems[index],
            link: link
        };
        setAttributes({ mediaItems: newMediaItems });
    };

    const removeMedia = (indexToRemove) => {
        const newMediaItems = attributes.mediaItems.filter((_, index) => index !== indexToRemove);
        setAttributes({ mediaItems: newMediaItems });
    };

    return (
        <section className="section-gallery">
            <div className="container medium-container">
                <RichText
                    tagName="h2"
                    value={attributes.title}
                    onChange={title => setAttributes({ title })}
                    placeholder="Entrez le titre de la galerie"
                />
            </div>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={onSelectMedia}
                    allowedTypes={['image', 'video']}
                    multiple={true}
                    value={attributes.mediaItems.map(item => item.id)}
                    render={({ open }) => (
                        <div className="gallery-content">
                            {attributes.mediaItems.length > 0 ? (
                                <>
                                    <div className="gallery-grid">
                                        {attributes.mediaItems.map((item, index) => (
                                            <div key={index} className="gallery-item">
                                                {item.type === 'video' ? (
                                                    <video
                                                        src={item.url}
                                                        muted
                                                        loop
                                                        autoPlay
                                                        playsInline
                                                        className="gallery-video"
                                                    />
                                                ) : (
                                                    <img
                                                        src={item.url}
                                                        alt={item.alt}
                                                        className="gallery-image"
                                                    />
                                                )}
                                                <div className="gallery-item-controls">
                                                    <Button
                                                        isDestructive
                                                        onClick={() => removeMedia(index)}
                                                        className="remove-media"
                                                        icon="no-alt"
                                                    />
                                                    <TextControl
                                                        label="Lien de redirection"
                                                        value={item.link}
                                                        onChange={(link) => updateItemLink(index, link)}
                                                        placeholder="https://..."
                                                        className="gallery-item-link"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="gallery-controls">
                                        <Button
                                            onClick={open}
                                            variant="primary"
                                            className="add-more-media"
                                        >
                                            Ajouter plus de médias
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <Button
                                    onClick={open}
                                    variant="primary"
                                    className="add-media"
                                >
                                    Ajouter des médias
                                </Button>
                            )}
                        </div>
                    )}
                />
            </MediaUploadCheck>
        </section>
    );
}

function SaveComponent() {
    return null; // Utilise le rendu PHP
}

