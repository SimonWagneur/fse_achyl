import { registerBlockType } from '@wordpress/blocks';
const { RichText, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, ToggleControl, TextControl, DatePicker } = wp.components;
const { __ } = wp.i18n;



function EditComponent({ attributes, setAttributes, clientId }) {
    const blockProps = useBlockProps();
    const { 
        title, 
        description, 
        fullPrice, 
        fullPriceTva,
        hasReducedPrice,
        reducedPrice,
        reducedPriceTva,
        promoEndDate,
        hasButton,
        buttonText,
        buttonUrl
    } = attributes;

    const ALLOWED_BLOCKS = [ "blocktheme/button", "blocktheme/card-feature"];
    const TEMPLATE = [
        ['blocktheme/button']
    ];

    const handleToggleReducedPrice = (value) => {
        setAttributes({ 
            hasReducedPrice: value,
            reducedPrice: value ? reducedPrice || "" : "",
            promoEndDate: value ? promoEndDate || "" : ""
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Paramètres de prix')}>
                    <ToggleControl
                        label={__('Activer le prix réduit')}
                        checked={hasReducedPrice}
                        onChange={handleToggleReducedPrice}
                    />
                    {hasReducedPrice && (
                        <>
                            <TextControl
                                label={__('Prix réduit')}
                                value={reducedPrice}
                                onChange={(value) => setAttributes({ reducedPrice: value })}
                                placeholder="79€"
                            />
                            {reducedPrice && (
                                <DatePicker
                                    currentDate={promoEndDate}
                                    onChange={(date) => setAttributes({ promoEndDate: date })}
                                    label={__('Date de fin de la promotion')}
                                />
                            )}
                        </>
                    )}
                </PanelBody>
                <PanelBody title={__('Options du bouton')}>
                    <ToggleControl
                        label={__('Afficher un bouton')}
                        checked={hasButton}
                        onChange={(value) => setAttributes({ hasButton: value })}
                    />
                    {hasButton && (
                        <>
                            <TextControl
                                label={__('Texte du bouton')}
                                value={buttonText}
                                onChange={(value) => setAttributes({ buttonText: value })}
                                placeholder="Choisir cette offre"
                            />
                            <TextControl
                                label={__('Lien du bouton')}
                                value={buttonUrl}
                                onChange={(value) => setAttributes({ buttonUrl: value })}
                                placeholder="#"
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
            <div className="card-pricing">
                <div className="top">
                    <RichText
                        tagName="h3"
                        className="h3"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder="Entrez le titre de l'offre..."
                    />
                    <div className="features">
                        <InnerBlocks
                            allowedBlocks={['core/paragraph', 'blocktheme/card-feature']}
                        />
                    </div>
                </div>
                <div className="bottom">
                    {hasReducedPrice && reducedPrice && (
                        <div className="prix inactive">
                            <RichText
                                tagName="div"
                                className="montant"
                                value={fullPrice}
                                onChange={(value) => setAttributes({ fullPrice: value })}
                                placeholder="999€"
                            />
                            <RichText
                                tagName="div"
                                className="tva"
                                value={fullPriceTva}
                                onChange={(value) => setAttributes({ fullPriceTva: value })}
                                placeholder="TTC/HT..."
                            />
                        </div>
                    )}
                    <div className="prix">
                        <RichText
                            tagName="div"
                            className="montant"
                            value={hasReducedPrice && reducedPrice ? reducedPrice : fullPrice}
                            onChange={(value) => {
                                if (hasReducedPrice) {
                                    setAttributes({ reducedPrice: value });
                                } else {
                                    setAttributes({ fullPrice: value });
                                }
                            }}
                            placeholder="999€"
                        />
                        <RichText
                            tagName="div"
                            className="tva"
                            value={hasReducedPrice && reducedPrice ? reducedPriceTva : fullPriceTva}
                            onChange={(value) => {
                                if (hasReducedPrice) {
                                    setAttributes({ reducedPriceTva: value });
                                } else {
                                    setAttributes({ fullPriceTva: value });
                                }
                            }}
                            placeholder="TTC/HT..."
                        />
                    </div>
                    {hasReducedPrice && reducedPrice && promoEndDate && (
                        <div className="promo">
                            Jusqu'au {new Date(promoEndDate).toLocaleDateString('fr-FR')}
                        </div>
                    )}
                    {hasButton && (
                        <div className="buttons">
                            <a>
                                <button className="primary black">
                                    <div className="text">
                                        <div className="main">
                                            <span>{buttonText || "Choisir cette offre"}</span>
                                        </div>
                                    </div>
                                    <div className="round-container">
                                        <div className="round">
                                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </button>
                            </a>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />;
}


registerBlockType('blocktheme/card-pricing', {
    parent: ['blocktheme/section-pricing'],
    attributes: {
        title: {
            type: "string",
            default: ""
        },
        description: {
            type: "string",
            default: ""
        },
        fullPrice: {
            type: "string",
            default: ""
        },
        fullPriceTva: {
            type: "string",
            default: ""
        },
        hasReducedPrice: {
            type: "boolean",
            default: false
        },
        reducedPrice: {
            type: "string",
            default: ""
        },
        reducedPriceTva: {
            type: "string",
            default: ""
        },
        promoEndDate: {
            type: "string",
            default: ""
        },
        hasButton: {
            type: "boolean",
            default: false
        },
        buttonText: {
            type: "string",
            default: ""
        },
        buttonUrl: {
            type: "string",
            default: ""
        }
    },
    edit: EditComponent,
    save: SaveComponent
});