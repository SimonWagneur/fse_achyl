import { RichText, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';



function EditComponent({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    return (
        <div {...blockProps}>
        <div className="card-kpi">
            <div className="content">
                <RichText
                    tagName="span"
                    className="number"
                    value={attributes.number}
                    onChange={number => setAttributes({ number })}
                    placeholder="Entrez un nombre"
                />
                <RichText
                    tagName="span"
                    className="wording"
                    value={attributes.wording}
                    onChange={wording => setAttributes({ wording })}
                    placeholder="Entrez un texte descriptif"
                />
            </div>
        </div>
        </div>
    );
}

function SaveComponent() {
    return null; // Utilise le rendu PHP
}

registerBlockType('blocktheme/card-kpi', {
    parent: ['blocktheme/section-kpis'],
    edit: EditComponent,
    save: SaveComponent
});