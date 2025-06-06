import { RichText, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { Button } from "@wordpress/components"
import { useBlockProps } from "@wordpress/block-editor";

wp.blocks.registerBlockType("blocktheme/section-contact", {
    title: "Section Contact",
    attributes: {
        imageUrl: { type: "string", default: "" },
        title: { type: "string", default: "Contactez-nous" },
        description: { type: "string", default: "Remplissez le formulaire ci-dessous pour nous contacter." }
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent({ attributes, setAttributes }) {
    const blockProps = useBlockProps();

    return (
        <section className="section-contact" {...blockProps}>
            <div className="container medium-container">
                <div className="left">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ imageUrl: media.url })}
                            allowedTypes={["image"]}
                            value={attributes.imageUrl}
                            render={({ open }) => (
                                <div className="image-container">
                                    {attributes.imageUrl ? (
                                        <>
                                            <img 
                                                src={attributes.imageUrl} 
                                                alt="Image de contact" 
                                            />
                                            <div className="button-container">
                                                <Button 
                                                    onClick={open}
                                                    isSecondary
                                                >
                                                    Remplacer l'image
                                                </Button>
                                                <Button 
                                                    onClick={() => setAttributes({ imageUrl: '' })}
                                                    isDestructive
                                                >
                                                    Supprimer
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={open}
                                            isPrimary
                                        >
                                            Ajouter une image
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                </div>
                <div className="right">
                    <div className="form-inner">
                        <RichText
                            tagName="h2"
                            value={attributes.title}
                            onChange={(title) => setAttributes({ title })}
                            placeholder="Titre de la section..."
                        />
                        <RichText
                            tagName="p"
                            value={attributes.description}
                            onChange={(description) => setAttributes({ description })}
                            placeholder="Description de la section..."
                        />
                        <div className="input-box w50">
                        <input type="text" id="prenom" name="prenom" required />
                        <label htmlFor="prenom">Prénom</label>
                        </div>

                        <div className="input-box w50">
                        <input type="text" id="nom" name="nom" required />
                        <label htmlFor="nom">Nom</label>
                        </div>

                        <div className="input-box w100">
                        <input type="email" id="email" name="email" required />
                        <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-box w100">
                        <textarea id="message" name="message" required></textarea>
                        <label htmlFor="message">Message</label>
                        </div>

                        <div className="input-box w100">
                        <select id="sujet" name="sujet">
                            <option value="">Choisissez un sujet</option>
                            <option value="support">Support</option>
                            <option value="devis">Demande de devis</option>
                        </select>
                        <label htmlFor="sujet">Sujet</label>
                        </div>

                        <div className="input-box w100">
                        <input type="file" id="cv" name="cv" />
                        <label htmlFor="cv">Joindre un fichier</label>
                        </div>

                        <div className="input-box w100">
                        <input type="date" id="date" name="date" />
                        <label htmlFor="date">Date souhaitée</label>
                        </div>

                        <div className="input-box w100">
                        <input type="checkbox" id="rgpd" name="rgpd" required />
                        <label htmlFor="rgpd">J’accepte les conditions</label>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

function SaveComponent() {
    return null;
}

