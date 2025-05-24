import { InspectorControls, MediaUpload, InnerBlocks } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";

wp.blocks.registerBlockType("blocktheme/card-solution", {
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

  const ALLOWED_BLOCKS = ['blocktheme/button-secondary'];
  const TEMPLATE = [
    ['blocktheme/button-secondary']
  ];

  return (
    <>
      <InspectorControls>
        <PanelBody title="Paramètres de la carte" initialOpen={true}>
          <TextControl
            label="URL du lien"
            value={linkUrl}
            onChange={(linkUrl) => setAttributes({ linkUrl })}
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

          <TextControl
            label="Titre"
            value={title}
            onChange={(title) => setAttributes({ title })}
          />

          <TextControl
            label="Description"
            value={description}
            onChange={(description) => setAttributes({ description })}
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

          <TextControl
            label="Couleur du bouton"
            value={buttonColor}
            onChange={(buttonColor) => setAttributes({ buttonColor })}
          />
        </PanelBody>
      </InspectorControls>

      <div className="card-solution">
        <div className="top">
          <div className="banner">
            <div 
              className="background" 
              style={{ backgroundImage: `url('${imageUrl}')` }}
            ></div>
          </div>
          <div className="content">
            <h3 className="h3">{title}</h3>
            <p className="p">{description}</p>
            <div className="tags">
              {tags.map((tag, index) => (
                <div key={index} className="tag">{tag}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="bottom">
          <InnerBlocks 
            allowedBlocks={ALLOWED_BLOCKS}
            template={TEMPLATE}
          />
        </div>
      </div>
    </>
  );
}

function SaveComponent({ attributes }) {
  return <InnerBlocks.Content />
}

