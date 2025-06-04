const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.blockEditor;

registerBlockType('fse-achyl/section-team', {
    edit: ({ attributes, setAttributes }) => {
        const { title, description } = attributes;

        // Ne permettre que les blocs de type card-team-member
        const ALLOWED_BLOCKS = ['fse-achyl/card-team-member'];

        // Template par défaut avec un bloc card-team-member
        const TEMPLATE = [
            ['fse-achyl/card-team-member']
        ];

        return (
            <section className="section-team">
                <div className="container medium-container">
                    <RichText
                        tagName="h2"
                        value={title}
                        onChange={(newTitle) => setAttributes({ title: newTitle })}
                        placeholder="Titre de la section équipe"
                    />
                    <div className="team-members">
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            orientation="horizontal"
                            renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                        />
                    </div>
                </div>
            </section>
        );
    },

    save: () => {
        return <InnerBlocks.Content />
    }
});

