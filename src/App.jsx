// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar'; // À créer (simple barre sticky)
import { CodeBlock } from './components/ui/CodeBlock';
import { Alert } from './components/ui/Alert';
import { navData } from './data/navData';
// Importez les autres composants UI (Card, Table, etc.) selon vos besoins

const Main = styled.main`
  margin-left: 260px;
  flex: 1;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 40px 48px 80px;
  max-width: 860px;
`;

// Composant Hero (intégré ici pour l'exemple)
const Hero = () => (
  <section id="intro">
    <h1>Recovery TUI</h1>
    <p>Documentation et commandes pour recovery-tui.</p>
  </section>
)

function App() {
  const [activeId, setActiveId] = useState('intro');

  // IntersectionObserver pour l'activation automatique
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -40% 0px' }
    );
    const elements = navData.map(({ id }) => document.getElementById(id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <GlobalStyle />
      <Sidebar activeId={activeId} onScrollTo={scrollTo} />
      <Main>
        <Topbar />
        <Content>
          <Hero />
          
          {/* SECTION : Installation */}
          <section id="install">
            <h2>Installation</h2>
            <CodeBlock language="bash">
              curl -sSL https://github.com/Misamu12/recovery-tui/install.sh | bash
            </CodeBlock>
            <Alert icon="⚠" bg="rgba(245,158,11,0.07)" border="rgba(245,158,11,0.2)" color="#fcd34d">
              Sur Ubuntu 23+, utilisez <code>pip install --break-system-packages</code>.
            </Alert>
          </section>

          {/* SECTION : Backup */}
          <section id="backup">
            <h2>backup</h2>
            <CodeBlock language="bash">
              recovery-tui backup --label "avant-migration" --compress
            </CodeBlock>
            {/* ... tout le reste du contenu ... */}
          </section>

          {/* Ajoutez toutes les autres sections (restore, list, etc.) de la même manière */}
        </Content>
      </Main>
    </>
  );
}

export default App;