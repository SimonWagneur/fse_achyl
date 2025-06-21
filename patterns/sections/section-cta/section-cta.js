import { registerBlockType } from '@wordpress/blocks';
const { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, InspectorControls } = wp.blockEditor;
const { Button, PanelBody } = wp.components;

function EditComponent({ attributes, setAttributes }){
  const { title, content, backgroundImage } = attributes;

  const ALLOWED_BLOCKS = ['blocktheme/button'];
  const TEMPLATE = [
      ['blocktheme/button', {}]
  ];

  // Fonction pour gérer la sélection de l'image de background
  const handleBackgroundSelect = (media) => {
    setAttributes({ backgroundImage: media.url });
  };

  // Fonction pour supprimer l'image de background
  const removeBackground = () => {
    setAttributes({ backgroundImage: '' });
  };

  return (
      <>
        <InspectorControls>
          <PanelBody title="Image de background">
            <MediaUploadCheck>
              <MediaUpload
                onSelect={handleBackgroundSelect}
                allowedTypes={['image']}
                value={backgroundImage}
                render={({ open }) => (
                  <>
                    {backgroundImage ? (
                      <div style={{ marginBottom: '10px' }}>
                        <img 
                          src={backgroundImage} 
                          alt="Background preview" 
                          style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                        />
                        <Button onClick={open} isSecondary style={{ marginRight: '5px' }}>
                          Modifier l'image
                        </Button>
                        <Button onClick={removeBackground} isDestructive>
                          Supprimer
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={open} isSecondary>
                        Ajouter une image de background
                      </Button>
                    )}
                  </>
                )}
              />
            </MediaUploadCheck>
          </PanelBody>
        </InspectorControls>

        <section className="section-cta">
          <div className="bg" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
            <div className="container">
                <RichText
                    tagName="h2"
                    className="h2"
                    value={title}
                    onChange={(newTitle) => setAttributes({ title: newTitle })}
                    placeholder="Entrez le titre..."
                />
                <RichText
                    tagName="p"
                    className="p"
                    value={content}
                    onChange={(newContent) => setAttributes({ content: newContent })}
                    placeholder="Entrez le contenu..."
                />
                <div className="buttons">
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>
            </div>
          </div>
        </section>
      </>
  );
}

function SaveComponent({ attributes }){
  return <InnerBlocks.Content />
}

registerBlockType('blocktheme/section-cta', {
    attributes: {
        title: {
            type: "string",
            default: ""
        },
        content: {
            type: "string",
            default: ""
        },
        backgroundImage: {
            type: "string",
            default: ""
        },
        anchor: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent
});