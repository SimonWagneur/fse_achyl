const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, __experimentalLinkControl: LinkControl } = wp.blockEditor;
const { PanelBody, TextControl, Button, SelectControl, Popover } = wp.components;
const { useState } = wp.element;

// Options de couleur pour le bouton
const colorOptions = [
  { label: "Noir", value: "black" },
  { label: "Blanc", value: "white" },
  { label: "Vert", value: "green" }
];

registerBlockType("blocktheme/card-solution", {
    parent: ['blocktheme/section-solutions'],
    title: "Card Solution",
    supports: {
        align: ["full"],
        html: false,
    },
    attributes: {
        linkUrl: { type: "string", default: "#" },
        imageUrl: { type: "string", default: "" },
        title: { type: "string", default: "" },
        description: { type: "string", default: "" },
        tags: { type: "array", default: [] },
        buttonColor: { type: "string", default: "black" },
        buttonText: { type: "string", default: "En savoir plus" }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const { linkUrl, imageUrl, title, description, tags, buttonColor, buttonText } = attributes;
    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

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

    return (
        <>
            <InspectorControls>
                <PanelBody title="Lien" initialOpen={true} >
                    <div className="custom-link-control-wrapper" style={{ minWidth: 'auto' }}>
                        <style>
                            {`
                            .custom-link-control-wrapper .block-editor-link-control {
                                min-width: auto !important;
                                width: 100% !important;
                            }
                            .custom-link-control-wrapper .block-editor-link-control__search-input {
                                min-width: auto !important;
                                width: 100% !important;
                            }
                            .custom-link-control-wrapper .block-editor-url-input {
                                min-width: auto !important;
                                width: 100% !important;
                            }
                            .custom-link-control-wrapper .block-editor-link-control__field {
                                margin: 0 !important;
                            }
                            `}
                        </style>
                        <LinkControl
                            value={{ url: linkUrl }}
                            onChange={({ url }) => setAttributes({ linkUrl: url })}
                            searchInputPlaceholder="Rechercher ou saisir une URL..."
                            showSuggestions={true}
                            suggestionsQuery={{
                                type: 'post',
                                subtype: ['page', 'post'],
                            }}
                        />
                    </div>
                </PanelBody>
                <PanelBody title="Image" initialOpen={true}>
                    <div className="editor-post-featured-image">
                        <MediaUpload
                            onSelect={(media) => setAttributes({ imageUrl: media.url })}
                            type="image"
                            value={imageUrl}
                            render={({ open }) => (
                                <div>
                                    {imageUrl ? (
                                        <div>
                                            <img 
                                                src={imageUrl} 
                                                alt="Image de la solution" 
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
                    </div>
                </PanelBody>
                <PanelBody title="Tags" initialOpen={true}>
                    <div style={{ marginBottom: "20px" }}>
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
                <PanelBody title="Bouton" initialOpen={true}>
                    <SelectControl
                        label="Couleur du bouton"
                        value={buttonColor}
                        options={colorOptions}
                        onChange={(value) => setAttributes({ buttonColor: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div className="card-solution">
                <div className="top">
                    <div className="banner">
                        <div 
                            className="background" 
                            style={{ backgroundImage: imageUrl ? `url('${imageUrl}')` : 'none' }}
                        ></div>
                    </div>
                    <div className="content">
                        <RichText
                            tagName="h3"
                            className="h3"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder="Titre de la carte"
                        />
                        <RichText
                            tagName="p"
                            className="p"
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            placeholder="Description de la carte"
                        />
                        <div className="tags">
                            {tags.map((tag, index) => (
                                <div key={index} className="tag">{tag}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <button className={`secondary ${buttonColor}`}>
                        <RichText
                            tagName="span"
                            value={buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                            placeholder="Texte du bouton..."
                        />
                  </button>
                </div>
            </div>
        </>
    );
}

function SaveComponent() {
    return null;
}

