import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

function EditComponent() {
    const blockProps = useBlockProps({
        className: 'section-hero5'
    });

    const currentPostTitle = useSelect(select => {
        const { getCurrentPostAttribute } = select('core/editor');
        return getCurrentPostAttribute('title');
    }, []);

    return (
        <section {...blockProps}>
            <div className="container small-container">
                <h1>{currentPostTitle || 'Titre de la page'}</h1>
            </div>
        </section>
    );
}

function SaveComponent() {
    return null;
}

registerBlockType('fse-achyl/section-hero5', {
    edit: EditComponent,
    save: SaveComponent
});

