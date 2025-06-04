import { RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('blocktheme/card-kpi', {
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent({ attributes, setAttributes }) {
    return (
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
    );
}

function SaveComponent() {
    return null; // Utilise le rendu PHP
}

