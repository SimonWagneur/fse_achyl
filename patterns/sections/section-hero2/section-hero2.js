import { InnerBlocks, RichText, useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';



function EditComponent({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: 'hero'
    });

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
        <section className='hero'>
            <div class="container xlarge-container">
                <div className="section-hero2__content">
                    <RichText
                        tagName="h1"
                        className="section-hero2__title"
                        value={attributes.title}
                        onChange={title => setAttributes({ title })}
                        placeholder="Votre titre ici"
                    />
                    <RichText
                        tagName="p"
                        className="section-hero2__text"
                        value={attributes.text}
                        onChange={text => setAttributes({ text })}
                        placeholder="Votre texte descriptif ici"
                    />
                    <InnerBlocks 
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                    />
                </div>
                <div className="section-hero2__banner visual-container">
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

registerBlockType('blocktheme/section-hero2', {
    edit: EditComponent,
    save: SaveComponent
});