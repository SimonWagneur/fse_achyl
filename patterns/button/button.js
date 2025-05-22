import ourColors from '../../assets/colors/ourColors';
import { registerBlockType } from '@wordpress/blocks';
import {
  RichText,
  BlockControls,
  __experimentalLinkControl as LinkControl,
  InspectorControls,
  getColorObjectByColorValue
} from "@wordpress/block-editor"
import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
  PanelBody,
  PanelRow,
  ColorPalette
} from "@wordpress/components"
import { color, link } from "@wordpress/icons"
import { useState } from "@wordpress/element"

registerBlockType('blocktheme/button', {
  title: 'Button',
  icon: 'button',
  category: 'design',
  attributes: {
    text: { type: 'string', default: '' },
    linkObject: { type: "object"},
    colorName: {type: "string", default: "black"}
  },
  edit: EditComponent,
  save:  () => null
});

function EditComponent({ attributes, setAttributes }) {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)

  function handleTextChange(value) {
    setAttributes({ text: value });
  }

  function preventClickInEditor(event) {
    event.preventDefault();
  }

    function buttonHandler(){
      setIsLinkPickerVisible(prev => !prev)
  }

  function handleLinkChange(newLink){
    setAttributes({linkObject: newLink})
  }

  function handleColorChange(colorCode){
    setAttributes({colorName: colorCode})
  }

  // const ourColors = [
  //   {name: "green", color: "#00E682"},
  //   {name: "black", color: "#000000"},
  //   {name: "white", color: "#FFFFFF"},
  // ]

  const currentColorValue = ourColors.filter(color => {
    return color.name == attributes.colorName
  })[0].color

  function handleColorChange(colorCode){
    const { name } = getColorObjectByColorValue(ourColors, colorCode)
    setAttributes({colorName: name})
  }

  return (
    <>
    <BlockControls>
      <ToolbarGroup>
        <ToolbarButton onClick={buttonHandler} icon={link} />
      </ToolbarGroup>
    </BlockControls>
    <InspectorControls>
      <PanelBody title="Color" initialOpen={true}>
        <PanelRow>
          <ColorPalette disableCustomColors={true} clearable={false} colors={ourColors} value={currentColorValue} onChange={handleColorChange} />
        </PanelRow>
      </PanelBody>
    </InspectorControls>
    <a
      href={attributes.linkObject?.url || "#"}
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
              allowedFormats={[]}
              placeholder="Texte du bouton"
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
    {isLinkPickerVisible &&  (
      <Popover>
        <LinkControl settings={[]} value={attributes.linkObject} onChange={handleLinkChange} />
        <Button variant="primary" onClick={() => setIsLinkPickerVisible(false)} style={{display: "block", width: "100%"}}>Confirm link</Button>
      </Popover>
    )}
    </>
  );
}

function SaveComponent({ attributes }) {
  return (
    <a
      href={attributes.linkObject?.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'inline-block' }}
    >
      <button className={`primary ${attributes.colorName}`}>
        <div className="text">
          <div className="main">
            <RichText.Content tagName="span" value={attributes.text} />
          </div>
        </div>
        <div className="round-container">
          <div className="round">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>
      </button>
    </a>
  );
}

