import { registerBlockType } from '@wordpress/blocks';
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType('fse-achyl/section-sponsors', {
    edit: ({ attributes, setAttributes }) => {
        const { sponsorImages } = attributes;

        const onSelectImages = (media) => {
            const newImages = media.map(image => ({
                id: image.id,
                url: image.url,
                alt: image.alt || ''
            }));
            setAttributes({ sponsorImages: newImages });
        };

        const removeImage = (indexToRemove) => {
            const newImages = sponsorImages.filter((_, index) => index !== indexToRemove);
            setAttributes({ sponsorImages: newImages });
        };

        return (
            <section className="section-sponsors">
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectImages}
                        allowedTypes={['image']}
                        multiple={true}
                        gallery={true}
                        value={sponsorImages.map(img => img.id)}
                        render={({ open }) => (
                            <div className="sponsors-gallery">
                                {sponsorImages.length > 0 ? (
                                    <div className="sponsors-grid">
                                        {sponsorImages.map((image, index) => (
                                            <div key={image.id} className="sponsor-item">
                                                <img
                                                    src={image.url}
                                                    alt={image.alt}
                                                />
                                                <Button
                                                    isDestructive
                                                    onClick={() => removeImage(index)}
                                                    className="remove-sponsor"
                                                >
                                                    Supprimer
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            onClick={open}
                                            className="add-more-sponsors"
                                            variant="secondary"
                                        >
                                            Ajouter plus de sponsors
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={open}
                                        className="add-sponsors"
                                        variant="primary"
                                    >
                                        Ajouter des logos de sponsors
                                    </Button>
                                )}
                            </div>
                        )}
                    />
                </MediaUploadCheck>
            </section>
        );
    },

    save: () => {
        return null;
    }
});

