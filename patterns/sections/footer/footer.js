const { useSelect } = wp.data;
const { InspectorControls, RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl, Button, TextControl } = wp.components;
import { registerBlockType } from '@wordpress/blocks';

function EditComponent({ attributes, setAttributes }) {
    const { copyrightText, logoUrl, facebookUrl, instagramUrl, linkedinUrl, youtubeUrl } = attributes;
    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title="Footer Settings">
                    {logoUrl && (
                        <div style={{ marginBottom: 10 }}>
                            <img src={logoUrl} alt="Logo preview" style={{ maxWidth: "100%", height: "auto" }} />
                        </div>
                    )}
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
                </PanelBody>
                <PanelBody title="Réseaux sociaux" initialOpen={true}>
                    <TextControl
                        label="Lien Facebook"
                        value={facebookUrl}
                        onChange={(value) => setAttributes({ facebookUrl: value })}
                        placeholder="https://facebook.com/..."
                    />
                    <TextControl
                        label="Lien Instagram"
                        value={instagramUrl}
                        onChange={(value) => setAttributes({ instagramUrl: value })}
                        placeholder="https://instagram.com/..."
                    />
                    <TextControl
                        label="Lien LinkedIn"
                        value={linkedinUrl}
                        onChange={(value) => setAttributes({ linkedinUrl: value })}
                        placeholder="https://linkedin.com/..."
                    />
                    <TextControl
                        label="Lien YouTube"
                        value={youtubeUrl}
                        onChange={(value) => setAttributes({ youtubeUrl: value })}
                        placeholder="https://youtube.com/..."
                    />
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
                            {facebookUrl && (
                                <a target="_blank" className="link" href={facebookUrl} rel="noopener noreferrer" aria-label="Lien vers Facebook">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                            )}
                            {instagramUrl && (
                                <a target="_blank" className="link" href={instagramUrl} rel="noopener noreferrer" aria-label="Lien vers Instagram">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            )}
                            {linkedinUrl && (
                                <a target="_blank" className="link" href={linkedinUrl} rel="noopener noreferrer" aria-label="Lien vers LinkedIn">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            )}
                            {youtubeUrl && (
                                <a target="_blank" className="link" href={youtubeUrl} rel="noopener noreferrer" aria-label="Lien vers YouTube">
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                            )}
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

registerBlockType("blocktheme/footer", {
    title: "Pied de page",
    supports: {
      align: ["full"]
    },
    attributes: {
      align: { type: "string", default: "full" },
      copyrightText: { type: "string", default: "@2024 Achyl - All rights reserved" },
      logoUrl: { type: "string", default: "" },
      facebookUrl: { type: "string", default: "" },
      instagramUrl: { type: "string", default: "" },
      linkedinUrl: { type: "string", default: "" },
      youtubeUrl: { type: "string", default: "" }
    },
    edit: EditComponent,
    save: SaveComponent
  });