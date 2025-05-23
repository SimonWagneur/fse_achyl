const { useSelect } = wp.data;
const { InspectorControls, RichText, MediaUpload } = wp.blockEditor;
const { PanelBody, SelectControl, Button } = wp.components;

wp.blocks.registerBlockType("blocktheme/footer", {
  title: "Pied de page",
  supports: {
    align: ["full"]
  },
  attributes: {
    align: { type: "string", default: "full" },
    menu1Slug: { type: "string" },
    menu2Slug: { type: "string" },
    menu3Slug: { type: "string" },
    menu4Slug: { type: "string" },
    copyrightText: { type: "string", default: "@2024 Achyl - All rights reserved" },
    socialMenuSlug: { type: "string" },
    logoUrl: { type: "string", default: "https://achyl.be/wp-content/themes/achyl/images/achyl_black.png" }
  },
  edit: EditComponent,
  save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const { menu1Slug, menu2Slug, menu3Slug, menu4Slug, copyrightText, socialMenuSlug, logoUrl } = attributes;

    // Get available navigation menus
    const menus = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'wp_navigation') || [];
    }, []);

    const menuOptions = menus ? [
        { label: 'Select a menu', value: '' },
        ...menus.map(menu => ({
            label: menu.title.rendered,
            value: menu.slug
        }))
    ] : [{ label: 'Loading...', value: '' }];

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
                    <SelectControl
                        label="Menu 1 (Contact)"
                        value={menu1Slug}
                        options={menuOptions}
                        onChange={menu1Slug => setAttributes({ menu1Slug })}
                    />
                    <SelectControl
                        label="Menu 2 (Solutions)"
                        value={menu2Slug}
                        options={menuOptions}
                        onChange={menu2Slug => setAttributes({ menu2Slug })}
                    />
                    <SelectControl
                        label="Menu 3 (Liens utiles)"
                        value={menu3Slug}
                        options={menuOptions}
                        onChange={menu3Slug => setAttributes({ menu3Slug })}
                    />
                    <SelectControl
                        label="Menu 4 (A propos)"
                        value={menu4Slug}
                        options={menuOptions}
                        onChange={menu4Slug => setAttributes({ menu4Slug })}
                    />
                    <SelectControl
                        label="Social Menu"
                        value={socialMenuSlug}
                        options={menuOptions}
                        onChange={socialMenuSlug => setAttributes({ socialMenuSlug })}
                    />
                </PanelBody>
            </InspectorControls>

            <div className="footer">
                <div className="upper">
                    <div className="left">
                            <img
                                className="logo"
                                src={logoUrl || "https://achyl.be/wp-content/themes/achyl/images/achyl_black.png"}
                                alt="Site Logo"
                            />
                        <div className="menus">
                            <div className="menu">
                                <h4>Contact</h4>
                                <div className="menu-placeholder">
                                    {menu1Slug ? `Menu selected: ${menu1Slug}` : 'Select a menu in the sidebar'}
                                </div>
                            </div>
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
                        <div className="menu-placeholder">
                            {socialMenuSlug ? `Social menu selected: ${socialMenuSlug}` : 'Select a social menu in the sidebar'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function SaveComponent() {
    return null; // Using PHP render
}