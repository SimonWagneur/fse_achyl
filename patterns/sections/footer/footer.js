const { useSelect } = wp.data;
const { InspectorControls, RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { PanelBody, SelectControl, Button } = wp.components;

wp.blocks.registerBlockType("blocktheme/footer", {
  title: "Pied de page",
  supports: {
    align: ["full"]
  },
  attributes: {
    align: { type: "string", default: "full" },
    copyrightText: { type: "string", default: "@2024 Achyl - All rights reserved" },
    logoUrl: { type: "string", default: "" }
  },
  edit: EditComponent,
  save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const { copyrightText, logoUrl } = attributes;  

    return (
        <>
            <InspectorControls>
                <PanelBody title="Footer Settings">
                    <MediaUpload
                        onSelect={media => setAttributes({ logoUrl: media.url })}
                        allowedTypes={["image"]}
                        value={logoUrl}
                        render={({ open }) => (
                            <Button onClick={open} isSecondary style={{ marginBottom: 10 }}>
                                {logoUrl ? "Change Logo" : "Select Logo"}
                            </Button>
                        )}
                    />
                    {logoUrl && (
                        <div style={{ marginBottom: 10 }}>
                            <img src={logoUrl} alt="Logo preview" style={{ maxWidth: "100%", height: "auto" }} />
                        </div>
                    )}
                </PanelBody>
            </InspectorControls>

            <div className="footer">
                <div className="upper">
                    <div className="left">
                        {logoUrl && (
                            <img
                                className="logo"
                                src={logoUrl}
                                alt="Site Logo"
                            />
                        )}
                        <div className="menus">
                            <InnerBlocks
                                allowedBlocks={['blocktheme/menu-footer']}
                                template={[
                                    ['blocktheme/menu-footer'],
                                    ['blocktheme/menu-footer'],
                                    ['blocktheme/menu-footer'],
                                ]}
                                orientation="horizontal"
                            />
                        </div>
                    </div>
                    <i className="fa-solid fa-angle-up to-the-top" aria-hidden="true"></i>
                </div>

                <div className="lower">
                    <div className="left">
                        <RichText
                            tagName="div"
                            value={copyrightText}
                            onChange={copyrightText => setAttributes({ copyrightText })}
                            placeholder="Enter copyright text..."
                        />
                    </div>
                    <div className="right">
                    </div>
                </div>
            </div>
        </>
    );
}

function SaveComponent() {
    return (
        <div className="menus">
            <InnerBlocks.Content />
        </div>
    );
}