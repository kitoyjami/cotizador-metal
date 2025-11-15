import { useState } from 'react';
import './App.css';
import PageWrapper from './components/layout/PageWrapper.jsx';
import OrientationToggle from './components/layout/OrientationToggle.jsx';
import QuoteEditorPage from './pages/QuoteEditorPage.jsx';

function App() {
  const [orientation, setOrientation] = useState('portrait');

  const handleToggleOrientation = () => {
    setOrientation(prev => (prev === 'portrait' ? 'landscape' : 'portrait'));
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Cotizador Metalstruct</h1>
          <p className="app-subtitle">
            Módulo de generación de cotizaciones imprimibles en A4.
          </p>
        </div>
        <div className="app-actions">
          <OrientationToggle
            orientation={orientation}
            onToggle={handleToggleOrientation}
          />
        </div>
      </header>

      <main className="app-main">
        <PageWrapper orientation={orientation}>
          <QuoteEditorPage />
        </PageWrapper>
      </main>
    </div>
  );
}

export default App;
