const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, SelectControl } = wp.components;

registerBlockType('blocktheme/section-benefits1', {
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const { heading, paragraph, imageUrl, reversed } = attributes;

    const ALLOWED_BLOCKS = ['blocktheme/button'];
    const TEMPLATE = [
        ['blocktheme/button', {}]
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title="Options de mise en page">
                    <SelectControl
                        label="Position de l'image"
                        value={reversed ? 'left' : 'right'}
                        options={[
                            { label: 'Image à droite', value: 'right' },
                            { label: 'Image à gauche', value: 'left' }
                        ]}
                        onChange={(value) => setAttributes({ reversed: value === 'left' })}
                    />
                </PanelBody>
            </InspectorControls>

            <section className={`section-benefits1 ${reversed ? 'reversed' : ''}`}>
                <div className="container medium-container">
                    <div className="left">
                        <RichText
                            tagName="h2"
                            className="h2"
                            value={heading}
                            onChange={(newHeading) => setAttributes({ heading: newHeading })}
                            placeholder="Entrez le titre..."
                        />
                        <RichText
                            tagName="p"
                            className="p"
                            value={paragraph}
                            onChange={(newParagraph) => setAttributes({ paragraph: newParagraph })}
                            placeholder="Entrez le contenu..."
                        />
                        <div className="buttons">
                            <InnerBlocks
                                allowedBlocks={ALLOWED_BLOCKS}
                                template={TEMPLATE}
                                renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div className="canvas">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ imageUrl: media.url })}
                                    allowedTypes={['image']}
                                    value={imageUrl}
                                    render={({ open }) => (
                                        <>
                                            <img 
                                                id="heroBackground" 
                                                src={imageUrl} 
                                                alt="Background" 
                                            />
                                            <Button onClick={open} isSecondary style={{ position: "absolute" }}>
                                                Modifier l'image
                                            </Button>
                                        </>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function SaveComponent({ attributes }) {
    return <InnerBlocks.Content />;
}

