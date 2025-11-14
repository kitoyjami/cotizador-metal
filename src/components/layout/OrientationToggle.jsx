// src/components/layout/OrientationToggle.jsx
function OrientationToggle({ orientation, onToggle }) {
  const isPortrait = orientation === 'portrait';

  return (
    <button
      type="button"
      className="btn-orientation"
      onClick={onToggle}
    >
      {isPortrait ? 'A4 vertical' : 'A4 horizontal'}
    </button>
  );
}

export default OrientationToggle;
