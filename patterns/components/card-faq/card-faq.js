import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';

registerBlockType("blocktheme/card-faq", {
    title: "Card FAQ",
    attributes: {
        title: {
            type: "string",
            default: "Combien coûte la création d'un site ?"
        },
        content: {
            type: "string",
            default: "Les prix pour un site vitrine commencent à 1990€. Pour un site e-commerce, les prix commencent à 2990€. Après un appel découverte, nous réalisons un audit pour vous proposer un devis clair et adapté, sans frais cachés."
        }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const blockProps = useBlockProps();

    return (
        <>
            {/* Render */}
            <div className="card-faq">
                <div className="top">
                    <RichText
                        tagName="h3"
                        className="h3"
                        value={attributes.title}
                        onChange={(title) => setAttributes({ title })}
                        placeholder="Question..."
                    />
                    <i className="fa-solid fa-plus" aria-hidden="true"></i>
                </div>
                <RichText
                    tagName="p"
                    style={{ display: 'block' }}
                    value={attributes.content}
                    onChange={(content) => setAttributes({ content })}
                    placeholder="Réponse..."
                />
            </div>
        </>
    );
}

function SaveComponent({ attributes }) {
    return null;
}

