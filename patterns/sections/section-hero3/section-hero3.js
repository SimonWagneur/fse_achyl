import { InnerBlocks, RichText, useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';

registerBlockType('blocktheme/section-hero3', {
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const ALLOWED_BLOCKS = ['blocktheme/button'];
    const TEMPLATE = [
        ['blocktheme/button', {}]
    ];

    const onSelectImage = (media) => {
        setAttributes({
            imageUrl: media.url,
            imageId: media.id,
            imageAlt: media.alt || ''
        });
    };

    const onRemoveImage = () => {
        setAttributes({
            imageUrl: '',
            imageId: 0,
            imageAlt: ''
        });
    };

    return (
        <section className="section-hero3 hero">
            <div className="container xlarge-container">
                <div className="upper">
                    <RichText
                        tagName="h1"
                        value={attributes.title}
                        onChange={title => setAttributes({ title })}
                        placeholder="Votre titre ici"
                    />
                    <div className="right">
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
                </div>
                <div className="lower visual-container">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={attributes.imageId}
                            render={({ open }) => (
                                attributes.imageUrl ? (
                                    <>
                                        <img
                                            src={attributes.imageUrl}
                                            alt={attributes.imageAlt}
                                        />
                                        <Button
                                            onClick={onRemoveImage}
                                            className="remove-image"
                                            isDestructive
                                        >
                                            Supprimer l'image
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={open}
                                        className="select-image"
                                        variant="primary"
                                    >
                                        Sélectionner une image
                                    </Button>
                                )
                            )}
                        />
                    </MediaUploadCheck>
                </div>
            </div>
        </section>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />
}

