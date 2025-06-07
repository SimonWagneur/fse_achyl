import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, TextControl } from "@wordpress/components";
import { useSelect } from '@wordpress/data';
import metadata from './block.json';



function EditComponent({ attributes, setAttributes }) {
  const { menuSlug, title } = attributes;

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
        <PanelBody title="Titre" initialOpen={true}>
          <TextControl
            label="Titre du menu"
            value={title}
            onChange={title => setAttributes({ title })}
            placeholder="Entrez le titre..."
          />
        </PanelBody>
        <PanelBody title="Menu" initialOpen={true}>
          <SelectControl
            label="Sélectionner un menu"
            value={menuSlug}
            options={menuOptions}
            onChange={menuSlug => setAttributes({ menuSlug })}
          />
        </PanelBody>
      </InspectorControls>

      <div className="menu-footer">
        <div className='title-menu'>{title || 'Menu Title'}</div>
        <div className="menu-placeholder">
          {menuSlug ? `Menu selected: ${menuSlug}` : 'Sélectionnez un menu dans le panneau latéral'}
        </div>
      </div>
    </>
  );
}

registerBlockType(metadata.name, {
  parent: ['blocktheme/footer'],
  attributes: {
    align: { type: "string", default: "full" },
    menuSlug: { type: "string", default: "" },
    title: { type: "string", default: "" },
  },
  edit: EditComponent,
  save: () => null
});