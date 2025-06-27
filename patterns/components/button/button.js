import ourColors from '../../../assets/colors/ourColors';
import { RichText, InspectorControls, getColorObjectByColorValue, useBlockProps, __experimentalLinkControl as LinkControl } from "@wordpress/block-editor"
import { TextControl, PanelBody, PanelRow, ColorPalette, CheckboxControl, SelectControl } from "@wordpress/components"
import { useState } from '@wordpress/element';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';



function EditComponent({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  

  function handleTextChange(value) {
    setAttributes({ text: value });
  }

  function preventClickInEditor(event) {
    event.preventDefault();
  }

  const currentColorValue = ourColors.filter(color => {
    return color.name == attributes.colorName
  })[0].color

  function handleColorChange(colorCode) {
    const { name } = getColorObjectByColorValue(ourColors, colorCode)
    setAttributes({ colorName: name })
  }

  function handleDisabledChange(isChecked) {
    setAttributes({ disabled: Boolean(isChecked) });
  }

  function handleButtonStyleChange(newStyle) {
    setAttributes({ buttonStyle: newStyle });
  }

  // Déterminer les classes CSS en fonction du style du bouton
  const buttonClasses = `primary ${attributes.colorName}${attributes.buttonStyle === 'secondary' ? ' border' : ''}`;

  return (
    <>
      <InspectorControls>
        <PanelBody title="Style du bouton" initialOpen={true}>
          <PanelRow>
            <SelectControl
              label="Style du bouton"
              value={attributes.buttonStyle || 'primary'}
              options={[
                { label: 'Primaire', value: 'primary' },
                { label: 'Secondaire', value: 'secondary' }
              ]}
              onChange={handleButtonStyleChange}
            />
          </PanelRow>
        </PanelBody>
        <PanelBody title="Lien" initialOpen={true} >
          <div className="custom-link-control-wrapper" style={{ minWidth: 'auto' }}>
              <style>
                  {`
                  .custom-link-control-wrapper .block-editor-link-control {
                      min-width: auto !important;
                      width: 100% !important;
                  }
                  .custom-link-control-wrapper .block-editor-link-control__search-input {
                      min-width: auto !important;
                      width: 100% !important;
                  }
                  .custom-link-control-wrapper .block-editor-url-input {
                      min-width: auto !important;
                      width: 100% !important;
                  }
                  .custom-link-control-wrapper .block-editor-link-control__field {
                      margin: 0 !important;
                  }
                  `}
              </style>
              <LinkControl
                  value={{ url: attributes.linkUrl }}
                  onChange={({ url }) => setAttributes({ linkUrl: url })}
                  searchInputPlaceholder="Rechercher ou saisir une URL..."
                  showSuggestions={true}
                  suggestionsQuery={{
                      type: 'post',
                      subtype: ['page', 'post'],
                  }}
              />
          </div>
      </PanelBody>
        <PanelBody title="Couleur" initialOpen={true}>
          <PanelRow>
            <ColorPalette disableCustomColors={true} clearable={false} colors={ourColors} value={currentColorValue} onChange={handleColorChange} />
          </PanelRow>
        </PanelBody>
        <PanelBody title="Désactivé" initialOpen={true}>
          <PanelRow>
            <CheckboxControl 
              label="Désactiver le bouton"
              checked={attributes.disabled || false}
              onChange={handleDisabledChange}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <a
          href={attributes.linkObject.url || "#"}  
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block' }}
          onClick={preventClickInEditor}
        >
          <button 
            className={buttonClasses}
            disabled={attributes.disabled || false}
          >
            <div className="text">
              <div className="main">
                <RichText
                  tagName="span"
                  value={attributes.text}
                  onChange={handleTextChange}
                  placeholder="Bouton"
                />
              </div>
            </div>
            <div className="round-container">
              <div className="round">
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </div>
            </div>
          </button>
        </a>
      </div>
    </>
  );
}

registerBlockType(metadata.name, {
  edit: EditComponent,
  save: () => null
});

