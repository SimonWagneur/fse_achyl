import { registerBlockType } from '@wordpress/blocks';
const { RichText, MediaUpload, MediaUploadCheck, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType('fse-achyl/card-team-member', {
    parent: ['fse-achyl/section-team'],
    edit: ({ attributes, setAttributes }) => {
        const { profileImage, memberName, memberDescription } = attributes;
        const blockProps = useBlockProps();
        const onSelectImage = (media) => {
            setAttributes({
                profileImage: {
                    url: media.url,
                    id: media.id,
                    alt: media.alt
                }
            });
        };

        const removeImage = () => {
            setAttributes({
                profileImage: {
                    url: '',
                    id: null,
                    alt: ''
                }
            });
        };

        return (
            <div {...blockProps}>
            <div className="card-team-member">
                <div className="pp">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={profileImage.id}
                            render={({ open }) => (
                                profileImage.url ? (
                                    <div className="image-container">
                                        <img
                                            src={profileImage.url}
                                            alt={profileImage.alt}
                                            onClick={open}
                                        />
                                        <Button
                                            isDestructive
                                            onClick={removeImage}
                                            className="remove-image"
                                        >
                                            Supprimer l'image
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={open}
                                        className="select-image-button"
                                        variant="secondary"
                                    >
                                        Choisir une image
                                    </Button>
                                )
                            )}
                        />
                    </MediaUploadCheck>
                </div>
                <RichText
                    tagName="h3"
                    value={memberName}
                    onChange={(newName) => setAttributes({ memberName: newName })}
                    placeholder="Nom du membre"
                />
                <RichText
                    tagName="p"
                    value={memberDescription}
                    onChange={(newDescription) => setAttributes({ memberDescription: newDescription })}
                    placeholder="Description du membre"
                />
            </div>
            </div>
        );
    },

    save: () => {
        return null; // Utilise le rendu côté serveur
    }
});

