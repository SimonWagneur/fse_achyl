import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, SelectControl, TextControl, Button } from "@wordpress/components"
import { registerBlockType } from '@wordpress/blocks';

// Fonction pour nettoyer le label (même logique que côté PHP)
function sanitize_label(label) {
    return label.toLowerCase().replace(/[^a-z0-9]/g, '');
}



function EditComponent({ attributes, setAttributes }) {
    const { type, label, width, selectOptions } = attributes;
    const id = sanitize_label(label);

    // Options disponibles pour le type de champ
    const typeOptions = [
        { label: "Texte", value: "texte" },
        { label: "Date", value: "date" },
        { label: "Case à cocher", value: "checkbox" },
        { label: "Fichier", value: "fichier" },
        { label: "Liste déroulante", value: "liste" },
        { label: "Message", value: "message" }
    ];

    // Options pour la largeur
    const widthOptions = [
        { label: "Largeur complète", value: "w100" },
        { label: "Demi largeur", value: "w50" }
    ];

    // Gestion des options du select
    const addSelectOption = () => {
        setAttributes({
            selectOptions: [...selectOptions, { label: "Nouvelle option" }]
        });
    };

    const updateSelectOption = (index, newLabel) => {
        const newOptions = [...selectOptions];
        newOptions[index] = { 
            label: newLabel,
            value: sanitize_label(newLabel)
        };
        setAttributes({ selectOptions: newOptions });
    };

    const removeSelectOption = (index) => {
        const newOptions = selectOptions.filter((_, i) => i !== index);
        setAttributes({ selectOptions: newOptions });
    };

    // Rendu du champ en fonction du type
    const renderField = () => {
        switch(type) {
            case 'date':
                return <input type="date" id={id} disabled />;
            case 'checkbox':
                return <input type="checkbox" id={id} disabled />;
            case 'fichier':
                return <input type="file" id={id} disabled />;
            case 'liste':
                return (
                    <select id={id} disabled>
                        <option value="">Choisissez une option</option>
                        {selectOptions.map((option, index) => (
                            <option key={index} value={option.value || sanitize_label(option.label)}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            case 'message':
                return <textarea id={id} disabled></textarea>;
            default:
                return <input type="text" id={id} disabled />;
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
                    <SelectControl
                        label="Largeur du champ"
                        value={width}
                        options={widthOptions}
                        onChange={(value) => setAttributes({ width: value })}
                    />
                    
                    {type === 'liste' && (
                        <div style={{ marginTop: '20px' }}>
                            <p><strong>Options de la liste</strong></p>
                            {selectOptions.map((option, index) => (
                                <div key={index} style={{ display: 'flex', marginBottom: '10px', gap: '10px' }}>
                                    <TextControl
                                        value={option.label}
                                        onChange={(newLabel) => updateSelectOption(index, newLabel)}
                                    />
                                    <Button 
                                        isDestructive
                                        onClick={() => removeSelectOption(index)}
                                    >
                                        ×
                                    </Button>
                                </div>
                            ))}
                            <Button 
                                variant="secondary"
                                onClick={addSelectOption}
                                style={{ marginTop: '10px' }}
                            >
                                Ajouter une option
                            </Button>
                        </div>
                    )}
                </PanelBody>
            </InspectorControls>

            <div className={`input-box ${width}`}>
                {renderField()}
                <label htmlFor={id}>{label}</label>
            </div>
        </>
    )
}

function SaveComponent() {
    return null;
}

registerBlockType("blocktheme/champ-formulaire", {
    title: "Champ de formulaire",
    parent: ['blocktheme/form'],
    attributes: {
        type: { type: "string", default: "texte" },
        label: { type: "string", default: "Label" },
        width: { type: "string", default: "w100" },
        selectOptions: { type: "array", default: [] }
    },
    edit: EditComponent,
    save: SaveComponent
})