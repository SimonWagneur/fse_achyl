import { InspectorControls, InnerBlocks } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

wp.blocks.registerBlockType("blocktheme/header", {
  title: "Navbar",
  supports: {
    align: ["full"]
  },
  attributes: {
    align: { type: "string", default: "full" },
    menuSlug: { type: "string", default: "" }
  },
  edit: EditComponent,
  save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
  const { menuSlug } = attributes;

  const menus = useSelect((select) => {
    return select('core').getEntityRecords('taxonomy', 'nav_menu') || [];
  }, []);

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
                    label: menu.name,
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
          <a href="/">
            <img className="logo" src="/wp-content/themes/votre-theme/images/achyl_black.png" alt="Site Logo" />
          </a>

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
