const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

registerBlockType('blocktheme/section-benefits2', {
    attributes: {
        anchor: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent() {
    const ALLOWED_BLOCKS = ['blocktheme/card-benefits2'];
    const TEMPLATE = [
        ['blocktheme/card-benefits2', {}]
    ];

    return (
        <section className="section-benefits2">
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
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />;
}

