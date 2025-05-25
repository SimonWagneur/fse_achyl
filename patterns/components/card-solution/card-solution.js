const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload } = wp.blockEditor;
const { PanelBody, TextControl, Button, SelectControl } = wp.components;

// Options de couleur pour le bouton
const colorOptions = [
  { label: "Noir", value: "black" },
  { label: "Blanc", value: "white" },
  { label: "Vert", value: "green" }
];

registerBlockType("blocktheme/card-solution", {
    title: "Card Solution",
    supports: {
        align: ["full"]
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

    return (
        <>
            <InspectorControls>
                <PanelBody title="Paramètres de la carte" initialOpen={true}>
                    <TextControl
                        label="URL du lien"
                        value={linkUrl}
                        onChange={(value) => setAttributes({ linkUrl: value })}
                    />
                    
                    <MediaUpload
                        onSelect={(media) => setAttributes({ imageUrl: media.url })}
                        allowedTypes={["image"]}
                        render={({ open }) => (
                            <Button onClick={open} isPrimary>
                                {imageUrl ? "Changer l'image" : "Sélectionner une image"}
                            </Button>
                        )}
                    />

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "8px" }}>Tags</label>
                        {tags.map((tag, index) => (
                            <TextControl
                                key={index}
                                value={tag}
                                onChange={(value) => handleTagChange(index, value)}
                                style={{ marginBottom: "8px" }}
                            />
                        ))}
                        <Button isSecondary onClick={addNewTag}>
                            Ajouter un tag
                        </Button>
                    </div>

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

