import { useBlockProps, InnerBlocks, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, TextControl } from "@wordpress/components"
import { registerBlockType } from '@wordpress/blocks';

function EditComponent({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { buttonText, destination, objet, endpoint } = attributes;

    const ALLOWED_BLOCKS = ['blocktheme/champ-formulaire'];
    const TEMPLATE = [
        ['blocktheme/champ-formulaire', {}]
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title="Paramètres du formulaire" initialOpen={true}>
                    <TextControl
                        label="Texte du bouton"
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                </PanelBody>
                <PanelBody title="Configuration email" initialOpen={false}>
                    <TextControl
                        label="Adresse de destination"
                        value={destination}
                        onChange={(value) => setAttributes({ destination: value })}
                        placeholder="exemple@email.com"
                        help="L'adresse email qui recevra les messages du formulaire"
                    />
                </PanelBody>
                <PanelBody title="Objet du mail" initialOpen={false}>
                    <TextControl
                        label="Objet par défaut"
                        value={objet}
                        onChange={(value) => setAttributes({ objet: value })}
                        placeholder="Nouveau message depuis le formulaire"
                        help="L'objet par défaut des emails envoyés"
                    />
                </PanelBody>
                <PanelBody title="Configuration endpoint" initialOpen={false}>
                    <TextControl
                        label="URL de l'endpoint"
                        value={endpoint}
                        onChange={(value) => setAttributes({ endpoint: value })}
                        placeholder="https://example.com/endpoint"
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
            <form className="form-container">
                <InnerBlocks 
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={TEMPLATE}
                    renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                />
                <button className="primary black" type="button">
                    <div className="text">
                        <div className="main">
                            <span>{buttonText}</span>
                        </div>
                    </div>
                    <div className="round-container">
                        <div className="round">
                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </div>
                    </div>
                </button>
            </form>
            </div>
        </>
    )
}

function SaveComponent() {
  return <InnerBlocks.Content />
}

registerBlockType("blocktheme/form", {
    title: "Formulaire",
    attributes: {
        buttonText: { type: "string", default: "Envoyer" },
        destination: { type: "string", default: "" },
        objet: { type: "string", default: "" },
        endpoint: { type: "string", default: "" }
    },
    edit: EditComponent,
    save: SaveComponent
})