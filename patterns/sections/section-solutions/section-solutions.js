import { InnerBlocks, RichText } from "@wordpress/block-editor";

wp.blocks.registerBlockType("blocktheme/section-solutions", {
  title: "Section Solutions",
  supports: {
    align: ["full"]
  },
  attributes: {
    title: {
      type: "string",
      default: "Nos solutions"
    }
  },
  edit: EditComponent,
  save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
  const { title } = attributes;

  const ALLOWED_BLOCKS = ['blocktheme/card-solution'];
  const TEMPLATE = [
    ['blocktheme/card-solution'],
    ['blocktheme/card-solution'],
    ['blocktheme/card-solution'],
    ['blocktheme/card-solution']
  ];

  return (
    <section className="section-solutions">
      <div className="container medium-container">
        <RichText
          tagName="h2"
          className="h2"
          value={title}
          onChange={(title) => setAttributes({ title })}
          placeholder="Titre de la section..."
        />
        <div className="solutions-container">
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            template={TEMPLATE}
            templateLock={false}
            orientation="horizontal"
          />
        </div>
      </div>
    </section>
  );
}

function SaveComponent({ attributes }) {
  return <InnerBlocks.Content />
}
