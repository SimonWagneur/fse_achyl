import { useBlockProps, InnerBlocks, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, TextControl } from "@wordpress/components"

wp.blocks.registerBlockType("blocktheme/form", {
    title: "Formulaire",
    attributes: {
        buttonText: { type: "string", default: "Envoyer" }
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { buttonText } = attributes;

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
            </InspectorControls>

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
        </>
    )
}

function SaveComponent() {
  return <InnerBlocks.Content />
}

