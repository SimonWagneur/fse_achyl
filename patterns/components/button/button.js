import ourColors from '../../../assets/colors/ourColors';
import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls, getColorObjectByColorValue } from "@wordpress/block-editor"
import { TextControl, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
import metadata from './block.json';

registerBlockType(metadata.name, {
  edit: EditComponent,
  save: () => null
});

function EditComponent({ attributes, setAttributes }) {

  function handleTextChange(value) {
    setAttributes({ text: value });
  }

  function preventClickInEditor(event) {
    event.preventDefault();
  }

  function handleLinkChange(newLink) {
    setAttributes({ linkUrl: newLink })
  }

  const currentColorValue = ourColors.filter(color => {
    return color.name == attributes.colorName
  })[0].color

  function handleColorChange(colorCode) {
    const { name } = getColorObjectByColorValue(ourColors, colorCode)
    setAttributes({ colorName: name })
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Link" initialOpen={true}>
          <TextControl
            value={attributes.linkUrl}
            onChange={handleLinkChange}
          />
        </PanelBody>
        <PanelBody title="Color" initialOpen={true}>
          <PanelRow>
            <ColorPalette disableCustomColors={true} clearable={false} colors={ourColors} value={currentColorValue} onChange={handleColorChange} />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <a
        href={attributes.linkUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-block' }}
        onClick={preventClickInEditor}
      >
        <button className={`primary ${attributes.colorName}`}>
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
    </>
  );
}

