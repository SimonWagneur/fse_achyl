import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';




function EditComponent({ attributes, setAttributes }) {
  const { iconUrl, title, content } = attributes;

  return (
    <>
      <InspectorControls>
        <PanelBody title="Image Settings" initialOpen={true}>
          <div className="editor-post-featured-image">
            <MediaUploadCheck>
              <MediaUpload
                onSelect={image => setAttributes({ iconUrl: image.url })}
                allowedTypes={["image"]}
                value={iconUrl}
                render={({ open }) => (
                  <Button 
                    onClick={open}
                    className={iconUrl ? "editor-post-featured-image__preview" : "editor-post-featured-image__toggle"}
                  >
                    {iconUrl ? (
                      <img src={iconUrl} alt="Icon preview" style={{ maxWidth: "100%" }} />
                    ) : (
                      "Choose an icon"
                    )}
                  </Button>
                )}
              />
            </MediaUploadCheck>
            {iconUrl && (
              <Button 
                onClick={() => setAttributes({ iconUrl: "/assets/images/check-solid.svg" })}
                isDestructive
              >
                Reset to default icon
              </Button>
            )}
          </div>
        </PanelBody>
      </InspectorControls>

      <div className="card-solution2">
        <div className="icon">
          {iconUrl !== "/assets/images/check-solid.svg" && iconUrl && (
            <img src={iconUrl} alt="Solution icon" />
          )}
        </div>
        <div className="content">
          <RichText
            tagName="h3"
            value={title}
            onChange={title => setAttributes({ title })}
            placeholder="Enter title..."
          />
          <RichText
            tagName="p"
            value={content}
            onChange={content => setAttributes({ content })}
            placeholder="Enter description..."
          />
        </div>
      </div>
    </>
  );
}

function SaveComponent() {
  return null;
}

registerBlockType("blocktheme/card-solution2", {
  title: "Card Solution 2",
  parent: ['blocktheme/section-solutions2'],
  attributes: {
    iconUrl: {
      type: "string",
      default: "/assets/images/check-solid.svg"
    },
    title: {
      type: "string",
      default: ""
    },
    content: {
      type: "string",
      default: ""
    }
  },
  edit: EditComponent,
  save: SaveComponent
});