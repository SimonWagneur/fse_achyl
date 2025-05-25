const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, TextControl, DatePicker } = wp.components;
const { __ } = wp.i18n;

registerBlockType('blocktheme/card-pricing', {
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
        }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const { 
        title, 
        description, 
        fullPrice, 
        fullPriceTva,
        hasReducedPrice,
        reducedPrice,
        reducedPriceTva,
        promoEndDate
    } = attributes;

    const ALLOWED_BLOCKS = ['blocktheme/button'];
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
            </InspectorControls>

            <div className="card-pricing">
                <div className="top">
                    <RichText
                        tagName="h3"
                        className="h3"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder="Entrez le titre de l'offre..."
                    />
                    <RichText
                        tagName="p"
                        className="p"
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                        placeholder="Entrez la description de l'offre..."
                    />
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
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                    />
                </div>
            </div>
        </>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />;
}

