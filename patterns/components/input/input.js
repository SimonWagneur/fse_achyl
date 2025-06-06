import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, SelectControl, TextControl } from "@wordpress/components"

wp.blocks.registerBlockType("blocktheme/input", {
    title: "Input",
    attributes: {
        type: { type: "string", default: "texte" },
        label: { type: "string", default: "Label" }
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { type, label } = attributes;

    // Options disponibles pour le type de champ
    const typeOptions = [
        { label: "Texte", value: "texte" },
        { label: "Date", value: "date" },
        { label: "Case à cocher", value: "checkbox" },
        { label: "Fichier", value: "fichier" },
        { label: "Liste déroulante", value: "liste" }
    ];

    // Rendu du champ en fonction du type
    const renderField = () => {
        switch(type) {
            case 'date':
                return <input type="date" disabled />;
            case 'checkbox':
                return <input type="checkbox" disabled />;
            case 'fichier':
                return <input type="file" disabled />;
            case 'liste':
                return (
                    <select disabled>
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                );
            default:
                return <input type="text" disabled />;
        }
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Paramètres du champ" initialOpen={true}>
                    <SelectControl
                        label="Type de champ"
                        value={type}
                        options={typeOptions}
                        onChange={(value) => setAttributes({ type: value })}
                    />
                    <TextControl
                        label="Label du champ"
                        value={label}
                        onChange={(value) => setAttributes({ label: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps} className="input-box">
                {renderField()}
                <label>{label}</label>
            </div>
        </>
    )
}

function SaveComponent() {
    return null;
}

