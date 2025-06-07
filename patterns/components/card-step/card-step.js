import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";



function EditComponent({ attributes, setAttributes, clientId }) {
    const { title, content } = attributes;
    const blockProps = useBlockProps();

    // Obtenir l'index du bloc parmi ses frères
    const stepNumber = wp.data.select('core/block-editor')
        .getBlockIndex(clientId) + 1;

    const ALLOWED_BLOCKS = ['blocktheme/button'];
    const TEMPLATE = [
        ['blocktheme/button']
    ];

    return (
        <div {...blockProps} className="slide card-step active">
            <div className="step-number">{stepNumber}</div>
            <RichText
                tagName="h3"
                className="h3"
                value={title}
                onChange={(title) => setAttributes({ title })}
                placeholder="Titre de l'étape..."
            />
            <RichText
                tagName="p"
                className="p"
                value={content}
                onChange={(content) => setAttributes({ content })}
                placeholder="Description de l'étape..."
            />
            <InnerBlocks
                allowedBlocks={ALLOWED_BLOCKS}
            />
        </div>
    );
}

function SaveComponent() {
    return <InnerBlocks.Content />;
}

registerBlockType("blocktheme/card-step", {
    parent: ['blocktheme/section-steps'],
    title: "Card Step",
    supports: {
        align: ["left", "center", "right"]
    },
    attributes: {
        title: {
            type: "string",
            default: ""
        },
        content: {
            type: "string",
            default: ""
        }
    },
    edit: EditComponent,
    save: SaveComponent
});