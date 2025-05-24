import { InspectorControls, RichText } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

wp.blocks.registerBlockType("blocktheme/button-secondary", {
  title: "Bouton Secondaire",
  supports: {
    align: ["left", "center", "right"]
  },
  attributes: {
    buttonColor: { type: "string", default: "black" },
    buttonText: { type: "string", default: "Cliquez ici" }
  },
  edit: EditComponent,
  save: () => null
});

function EditComponent({ attributes, setAttributes }) {
  const { buttonColor, buttonText } = attributes;

  const colorOptions = [
    { label: "Noir", value: "black" },
    { label: "Blanc", value: "white" },
    { label: "Vert", value: "green" }
  ];

  return (
    <>
      <InspectorControls>
        <PanelBody title="Paramètres du bouton" initialOpen={true}>
          <SelectControl
            label="Couleur du bouton"
            value={buttonColor}
            options={colorOptions}
            onChange={(buttonColor) => setAttributes({ buttonColor })}
          />
        </PanelBody>
      </InspectorControls>

      <button className={`secondary ${buttonColor}`}>
        <RichText
          tagName="span"
          value={buttonText}
          onChange={(buttonText) => setAttributes({ buttonText })}
          placeholder="Texte du bouton..."
        />
      </button>
    </>
  );
}

