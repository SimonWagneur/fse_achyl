import { InspectorControls, InnerBlocks, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { PanelBody, SelectControl, Button } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

wp.blocks.registerBlockType("blocktheme/header", {
  title: "Navbar",
  supports: {
    align: ["full"]
  },
  attributes: {
    align: { type: "string", default: "full" },
    menuSlug: { type: "string", default: "" },
    imageUrl: { type: "string", default: "" },
  },
  edit: EditComponent,
  save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
  const { menuSlug } = attributes;

  // Récupération des menus de navigation (FSE)
  const menus = useSelect((select) => {
    return select('core').getEntityRecords('postType', 'wp_navigation') || [];
  }, []);

  // // 🐛 DEBUG : afficher les menus dans la console
  // if (menus) {
  //   console.log("🔍 Menus navigation disponibles :", menus);
  // } else {
  //   console.log("⚠️ Aucun menu récupéré via useSelect (postType: navigation)");
  // }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Paramètres de la navigation" initialOpen={true}>
          <SelectControl
            label="Menu à afficher"
            value={menuSlug}
            options={
              menus.length
                ? menus.map(menu => ({
                    label: menu.title?.rendered || '(Sans titre)',
                    value: menu.slug
                  }))
                : [{ label: "Aucun menu disponible", value: "" }]
            }
            onChange={(slug) => setAttributes({ menuSlug: slug })}
          />
        </PanelBody>
      </InspectorControls>

      <div className="navbar">
        <div className="left">
          <MediaUploadCheck>
            <MediaUpload 
              onSelect={(media) => setAttributes({ imageUrl: media.url })}
              allowedTypes={["image"]}
              render={({ open }) => (
                <>
                  {attributes.imageUrl && (
                  <img
                    className="logo"
                    src={attributes.imageUrl}
                    alt="Logo"
                  />
                  )}
                  <Button onClick={open} isSecondary style={{ marginTop: "10px" }}>
                    Modifier l'image
                  </Button>
                </>
              )}
            />
          </MediaUploadCheck>

          <div className="menu-container">
            <div className="menu-placeholder">
              {menuSlug ? `Menu sélectionné : ${menuSlug}` : "Aucun menu sélectionné"}
            </div>
          </div>
        </div>

        <div className="right">
          <InnerBlocks allowedBlocks={['blocktheme/button']} />
        </div>
      </div>
    </>
  );
}

function SaveComponent() {
  return <InnerBlocks.Content />;
}
