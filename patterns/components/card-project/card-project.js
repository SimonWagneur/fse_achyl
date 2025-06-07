import { registerBlockType } from '@wordpress/blocks';
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { PanelBody, TextControl, Button } = wp.components;



function EditComponent({ attributes, setAttributes }) {
    const { title, content, buttonText, buttonUrl, imageUrl, tags } = attributes;

    // Fonction pour gérer les tags
    const handleTagChange = (index, value) => {
        const newTags = [...tags];
        if (value === "") {
        newTags.splice(index, 1);
        } else {
        newTags[index] = value;
        }
        setAttributes({ tags: newTags });
    };

    const addNewTag = () => {
        setAttributes({ tags: [...tags, ""] });
    };

    const removeTag = (indexToRemove) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setAttributes({ tags: newTags });
    };

    const ALLOWED_BLOCKS = ['blocktheme/button-secondary'];
    const TEMPLATE = [
        ['blocktheme/button-secondary']
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title="Lien" initialOpen={true}>
                    <TextControl
                        label="URL du bouton"
                        value={buttonUrl}
                        onChange={(value) => setAttributes({ buttonUrl: value })}
                        placeholder="https://..."
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
                                                    alt="Image du projet" 
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
                <PanelBody title="Tags" initialOpen={true}>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "8px" }}>Tags</label>
                        {tags.map((tag, index) => (
                            <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <TextControl
                                    value={tag}
                                    onChange={(value) => handleTagChange(index, value)}
                                />
                                <Button 
                                    isDestructive
                                    onClick={() => removeTag(index)}
                                    style={{ minWidth: '30px', padding: '0 8px' }}
                                >
                                    ×
                                </Button>
                            </div>
                        ))}
                        <Button isSecondary onClick={addNewTag}>
                            Ajouter un tag
                        </Button>
                    </div>
                </PanelBody>
            </InspectorControls>

            <div className="slide card-project active">
                <div className="left">
                    <RichText
                        tagName="h3"
                        className="h3"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder="Titre du projet"
                    />
                    <RichText
                        tagName="p"
                        className="p"
                        value={content}
                        onChange={(value) => setAttributes({ content: value })}
                        placeholder="Description du projet..."
                    />
                    <div className="tags">
                    {tags.map((tag, index) => (
                        <div key={index} className="tag">{tag}</div>
                    ))}
                    </div>
                        <button className="primary black">
                            <div className="text">
                                <RichText
                                    tagName="div"
                                    className="main"
                                    value={buttonText}
                                    onChange={(value) => setAttributes({ buttonText: value })}
                                    placeholder="Texte du bouton..."
                                />
                            </div>
                            <div className="round-container">
                                <div className="round">
                                    <i className="fa-solid fa-arrow-right"></i>
                                </div>
                            </div>
                        </button>
                </div>
                <div className="right">
                    <div className="canvas">
                        {imageUrl && <img src={imageUrl} alt={title} />}
                    </div>
                </div>
            </div>
        </>
    );
}

function SaveComponent() {
    return null;
}

registerBlockType('blocktheme/card-project', {
    parent: ['blocktheme/section-projects'],
    attributes: {
        title: {
            type: "string",
            default: ""
        },
        content: {
            type: "string",
            default: ""
        },
        buttonText: {
            type: "string",
            default: ""
        },
        buttonUrl: {
            type: "string",
            default: "#"
        },
        imageUrl: {
            type: "string",
            default: ""
        },
        tags: { type: "array", default: [] },
    },
    edit: EditComponent,
    save: SaveComponent
});