const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

registerBlockType('blocktheme/card-feature', {
    parent: ['blocktheme/section-features'],
    attributes: {
        content: {
            type: "string",
            default: ""
        }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    const { content } = attributes;

    return (
        <div className="card-feature">
            <i className="fa-solid fa-check"></i>
            <RichText
                tagName="span"
                value={content}
                onChange={(value) => setAttributes({ content: value })}
                placeholder="Entrez votre fonctionnalité..."
            />
        </div>
    );
}

function SaveComponent() {
    return null;
}

