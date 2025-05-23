// import { registerBlockType } from '@wordpress/blocks';

// registerBlockType(metadata.name, {
//   edit: EditComponent,
//   save: () => null
// });

function EditComponent({ attributes, setAttributes }) {

  function handleTextChange(value) {
    setAttributes({ text: value });
  }

  return (
    <>
    {/* InspectorControls */}

    {/* Render */}

    </>
  );
}

