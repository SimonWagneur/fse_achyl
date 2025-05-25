import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';

registerBlockType("blocktheme/card-testimonial", {
    title: "Card Testimonial",
    attributes: {
        testimonialContent: {
            type: "string",
            default: "Votre témoignage"
        },
        authorName: {
            type: "string",
            default: "Nom de la personne"
        },
        authorRole: {
            type: "string",
            default: "Fonction de la personne"
        }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const blockProps = useBlockProps();

    function handleContentChange(value) {
        setAttributes({ testimonialContent: value });
    }

    function handleNameChange(value) {
        setAttributes({ authorName: value });
    }

    function handleRoleChange(value) {
        setAttributes({ authorRole: value });
    }

    return (
        <>

            {/* Render */}
            <div {...blockProps} className="slide card-testimonial">
                <div className="upper">
                    <div className="quote">
                        <i className="fa-solid fa-quote-right" aria-hidden="true"></i>
                    </div>
                    <div className="stars">
                        <i className="fa-solid fa-star" aria-hidden="true"></i>
                        <i className="fa-solid fa-star" aria-hidden="true"></i>
                        <i className="fa-solid fa-star" aria-hidden="true"></i>
                        <i className="fa-solid fa-star" aria-hidden="true"></i>
                        <i className="fa-solid fa-star" aria-hidden="true"></i>
                    </div>
                    <RichText
                        tagName="p"
                        className="p"
                        value={attributes.testimonialContent}
                        onChange={handleContentChange}
                        placeholder="Entrez votre témoignage ici..."
                    />
                </div>
                <div className="credits">
                    <RichText
                        tagName="div"
                        className="nom"
                        value={attributes.authorName}
                        onChange={handleNameChange}
                        placeholder="Nom de la personne..."
                    />
                    <RichText
                        tagName="div"
                        className="fonction"
                        value={attributes.authorRole}
                        onChange={handleRoleChange}
                        placeholder="Fonction de la personne..."
                    />
                </div>
            </div>
        </>
    );
}

function SaveComponent({ attributes }) {
    // On n'a pas besoin de sauvegarder le HTML côté client car nous utilisons un template PHP
    return null;
}

