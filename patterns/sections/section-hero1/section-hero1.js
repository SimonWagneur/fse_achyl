import { RichText, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { Button } from "@wordpress/components"
import { InnerBlocks } from "@wordpress/block-editor"
import { useBlockProps } from "@wordpress/block-editor";
import { registerBlockType } from '@wordpress/blocks';




function EditComponent({ attributes, setAttributes }) {
  const blockProps = useBlockProps();

  return (
    <section className="hero section-hero1">
      <div className="container medium-container">
        <div className="left">
          <RichText
            tagName="h1"
            className="h1"
            value={attributes.heading}
            onChange={(value) => setAttributes({ heading: value })}
            placeholder="Make it easy avec Achyl"
          />
          <RichText
            tagName="p"
            className="p"
            value={attributes.paragraph}
            onChange={(value) => setAttributes({ paragraph: value })}
            placeholder="Un site internet performant, un tracking qui fonctionne..."
          />
          <InnerBlocks allowedBlocks={['blocktheme/button']} />
        </div>

        <div className="right">
          <div className="visual-container">
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => setAttributes({ imageUrl: media.url })}
                allowedTypes={["image"]}
                render={({ open }) => (
                  <>
                    <img
                      id="heroBackground"
                      src={attributes.imageUrl}
                      alt="Image sélectionnée"
                    />
                    <Button onClick={open} isSecondary style={{ marginTop: "10px" }}>
                      Modifier l'image
                    </Button>
                  </>
                )}
              />
            </MediaUploadCheck>
          </div>
        </div>
      </div>
    </section>
  )
}

function SaveComponent({ attributes }) {
  return <InnerBlocks.Content />
}

registerBlockType("blocktheme/section-hero1", {
  title: "Section Hero 1",
  attributes: {
    align: { type: "string", default: "full" },
    heading: { type: "string", default: "" },
    paragraph: { type: "string", default: "" },
    imageUrl: { type: "string", default: "https://achyl.be/wp-content/themes/achyl/images/home_bg_1080.png" },
    anchor: { type: "string" }
  },
  "supports": {
    "align": ["full"],
    "html": false,
    "anchor": true
  },
  edit: EditComponent,
  save: SaveComponent
})