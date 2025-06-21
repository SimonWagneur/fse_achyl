import { registerBlockType } from '@wordpress/blocks';
const { RichText, useBlockProps } = wp.blockEditor;



function EditComponent({ attributes, setAttributes }) {
    const { content } = attributes;
    const blockProps = useBlockProps();
    return (
        <div {...blockProps}>
        <div className="card-feature">
            <i className="fa-solid fa-check"></i>
            <RichText
                tagName="span"
                value={content}
                onChange={(value) => setAttributes({ content: value })}
                placeholder="Entrez votre fonctionnalité..."
            />
        </div>
        </div>
    );
}

function SaveComponent() {
    return null;
}

registerBlockType('blocktheme/card-feature', {
    parent: ['blocktheme/section-features', 'blocktheme/card-pricing', 'blocktheme/section-benefits1', 'blocktheme/section-benefits3'],
    attributes: {
        content: {
            type: "string",
            default: ""
        }
    },
    edit: EditComponent,
    save: SaveComponent
});