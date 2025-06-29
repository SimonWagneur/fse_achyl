import { registerBlockType } from '@wordpress/blocks';
import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

function EditComponent({ attributes, setAttributes }) {
  const { title } = attributes;
  const blockProps = useBlockProps();

  return (
    <section className="section-solution2">
      <div className="container medium-container">
        <RichText
          tagName="h2"
          className="h2"
          value={title}
          onChange={title => setAttributes({ title })}
          placeholder="Titre de la section..."
        />
        <div className="solutions2-container">
          <InnerBlocks
            allowedBlocks={['blocktheme/card-solution2']}
            renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
            // template={[
            //   ['blocktheme/card-solution2'],
            //   ['blocktheme/card-solution2'],
            //   ['blocktheme/card-solution2']
            // ]}
            // templateLock={false}
          />
        </div>
      </div>
    </section>
  );
}

function SaveComponent() {
  return <InnerBlocks.Content />
}

registerBlockType("blocktheme/section-solutions2", {
  title: "Section Solutions 2",
  supports: {
    "html": false,
    "anchor": true
  },
  attributes: {
    anchor: { type: "string" },
    title: {
      type: "string",
      default: ""
    }
  },
  edit: EditComponent,
  save: SaveComponent
});

