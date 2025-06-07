import { registerBlockType } from '@wordpress/blocks';
const { RichText, InnerBlocks } = wp.blockEditor;



function EditComponent({ attributes, setAttributes }){
  const { title, content } = attributes;

  const ALLOWED_BLOCKS = ['blocktheme/button'];
  const TEMPLATE = [
      ['blocktheme/button', {}]
  ];

  return (
      <section className="section-cta">
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
      </section>
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
        anchor: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent
});