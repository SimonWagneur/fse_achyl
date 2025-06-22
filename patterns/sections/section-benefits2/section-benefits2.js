import { registerBlockType } from '@wordpress/blocks';
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;



function EditComponent({ attributes, setAttributes }) {
    const { themeMode } = attributes;

    const ALLOWED_BLOCKS = ['blocktheme/card-benefits2'];
    const TEMPLATE = [
        ['blocktheme/card-benefits2', {}]
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title="Options de mise en page">
                    <SelectControl
                        label="Mode de thème"
                        value={themeMode}
                        options={[
                            { label: 'Mode clair', value: 'light' },
                            { label: 'Mode sombre', value: 'dark' }
                        ]}
                        onChange={(value) => setAttributes({ themeMode: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <section className={`section-benefits2 ${themeMode === 'dark' ? 'dark-mode' : ''}`}>
                <div className="container medium-container">
                    <div className="left">
                        <div className="state"></div>
                        <h2 className="h2"></h2>
                        <p className="p"></p>
                        <div className="controls">
                            <div className="control prev disabled"><i className="fa-solid fa-arrow-left"></i></div>
                            <div className="control next"><i className="fa-solid fa-arrow-right"></i></div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="canvas">
                            <img id="heroBackground" src="" alt="Background" />
                        </div>
                    </div>
                </div>
                <div className="slides">
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>
            </section>
        </>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />;
}

registerBlockType('blocktheme/section-benefits2', {
    attributes: {
        themeMode: {
            type: 'string',
            default: 'light'
        },
        anchor: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent
});