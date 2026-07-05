import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { CodeBlock } from './components/ui/CodeBlock';
import { Alert } from './components/ui/Alert';
import { Card } from './components/ui/Card';
import { Table } from './components/ui/Table';
import { navData } from './data/navData';
import {
  commands,
  compatItems,
  configYaml,
  coreSections,
  errorItems,
  quickCards,
  tuiScreens,
} from './data/docsContent';

const MainLayout = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 980px) {
    display: block;
  }
`;

const Main = styled.main`
  margin-left: 260px;
  flex: 1;
  min-height: 100vh;

  @media (max-width: 980px) {
    margin-left: 0;
  }
`;

const Content = styled.div`
  padding: 40px 48px 80px;
  max-width: 900px;

  @media (max-width: 760px) {
    padding: 28px 20px 64px;
  }
`;

const Section = styled.section`
  margin-bottom: 48px;
  scroll-margin-top: 72px;
`;

const Hero = styled(Section)`
  padding-bottom: 36px;
  border-bottom: 1px solid #1e2535;
`;

const Eyebrow = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #22c55e;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 16px;
    height: 2px;
    background: #22c55e;
    border-radius: 1px;
  }
`;

const H1 = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #f8fafc;
  line-height: 1.25;
  margin: 0 0 12px;
`;

const H2 = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 4px;
`;

const H3 = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #e2e8f0;
  margin: 24px 0 10px;
`;

const Paragraph = styled.p`
  color: #94a3b8;
  line-height: 1.7;
  margin: 0 0 12px;
`;

const SectionDesc = styled(Paragraph)`
  font-size: 14px;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  height: 1px;
  background: #1e2535;
  margin: 4px 0 22px;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin: 16px 0;
`;

const CommandCard = styled.article`
  border: 1px solid #263044;
  border-radius: 8px;
  overflow: hidden;
  margin: 12px 0;
`;

const CommandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
`;

const Method = styled.span`
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 4px;
  letter-spacing: 0.04em;
  font-family: 'JetBrains Mono', monospace;
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
`;

const CommandPath = styled.code`
  font-size: 13px;
  color: #e2e8f0;
  overflow-wrap: anywhere;
`;

const CommandBody = styled.div`
  padding: 16px;
  border-top: 1px solid #1e2535;
`;

const ShortcutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
  margin: 16px 0;
`;

const Shortcut = styled.div`
  border: 1px solid #263044;
  border-radius: 8px;
  padding: 10px 12px;
  color: #94a3b8;
  font-size: 13px;

  code {
    color: #86efac;
    margin-right: 6px;
  }
`;

const CompatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  margin: 16px 0;
`;

const CompatItem = styled.div`
  border: 1px solid rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.04);
  border-radius: 8px;
  padding: 12px 8px;
  text-align: center;
`;

const CompatName = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #e2e8f0;
`;

const CompatManager = styled.div`
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
`;

function CommandSection({ command }) {
  return (
    <Section id={command.id}>
      <H2>{command.title}</H2>
      <Divider />
      <SectionDesc>{command.description}</SectionDesc>
      <CommandCard>
        <CommandHeader>
          <Method>CLI</Method>
          <CommandPath>{command.signature}</CommandPath>
        </CommandHeader>
        <CommandBody>
          <Table columns={['Parametre', 'Type', 'Statut', 'Description']} rows={command.params} />
          <H3>Exemples</H3>
          <CodeBlock language="bash">{command.examples}</CodeBlock>
        </CommandBody>
      </CommandCard>
    </Section>
  );
}

function App() {
  const [activeId, setActiveId] = useState('intro');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    );

    const elements = navData.map(({ id }) => document.getElementById(id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <GlobalStyle />
      <MainLayout>
        <Sidebar activeId={activeId} onScrollTo={scrollTo} />
        <Main>
          <Topbar />
          <Content>
            <Hero id="intro">
              <Eyebrow>Documentation officielle</Eyebrow>
              <H1>RecoveryTUI - Backup & Restore Linux</H1>
              <Paragraph>
                Sauvegardez et restaurez vos applications Linux installees en quelques secondes:
                interface TUI, CLI scriptable et support des gestionnaires de paquets majeurs.
              </Paragraph>
              <BadgeRow>
                <Badge>APT / Snap</Badge>
                <Badge>Flatpak</Badge>
                <Badge>Pacman</Badge>
                <Badge>DNF</Badge>
                <Badge>GitHub Storage</Badge>
              </BadgeRow>
            </Hero>

            <Section id="install">
              <H2>Installation</H2>
              <Divider />
              <SectionDesc>Deux chemins sont documentes: script automatique ou installation manuelle avec virtualenv.</SectionDesc>
              <H3>Script automatique</H3>
              <CodeBlock language="bash">
                curl -sSL https://github.com/Misamu12/recovery-tui/install.sh | bash
              </CodeBlock>
              <H3>Installation manuelle recommandee</H3>
              <CodeBlock language="bash">
                {`git clone https://github.com/Misamu12/recovery-tui.git
cd recovery-tui
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -e .
recovery-tui --version`}
              </CodeBlock>
              <Alert icon="!">
                Sur Ubuntu 23+ ou Debian 12+, privilegiez un virtualenv. Utilisez
                <code>pip install --break-system-packages</code> seulement si vous acceptez l impact
                sur l environnement Python systeme.
              </Alert>
            </Section>

            <Section id="quickstart">
              <H2>Demarrage rapide</H2>
              <Divider />
              <CardsGrid>
                {quickCards.map((card) => (
                  <Card key={card.title} {...card} />
                ))}
              </CardsGrid>
              <CodeBlock language="bash">
                {`recovery-tui backup --label "avant-migration"
recovery-tui list
recovery-tui restore --skip-confirm`}
              </CodeBlock>
            </Section>

            <Section id="tui">
              <H2>Interface TUI</H2>
              <Divider />
              <SectionDesc>L interface terminal centralise backup, restore, configuration et consultation des snapshots.</SectionDesc>
              <CommandCard>
                <CommandHeader>
                  <Method>TUI</Method>
                  <CommandPath>recovery-tui tui</CommandPath>
                </CommandHeader>
              </CommandCard>
              <H3>Raccourcis clavier globaux</H3>
              <ShortcutGrid>
                <Shortcut><code>Tab</code>Changer de zone</Shortcut>
                <Shortcut><code>Enter</code>Valider l action</Shortcut>
                <Shortcut><code>Esc</code>Retour ou fermeture</Shortcut>
                <Shortcut><code>Ctrl+C</code>Quitter proprement</Shortcut>
              </ShortcutGrid>
            </Section>

            <Section id="screens">
              <H2>Ecrans TUI</H2>
              <Divider />
              <CardsGrid>
                {tuiScreens.map((card) => (
                  <Card key={card.title} {...card} />
                ))}
              </CardsGrid>
            </Section>

            {commands.map((command) => (
              <CommandSection key={command.id} command={command} />
            ))}

            {coreSections.map((section) => (
              <Section id={section.id} key={section.id}>
                <H2>{section.title}</H2>
                <Divider />
                <SectionDesc>{section.description}</SectionDesc>
                <CodeBlock language="python">{section.code}</CodeBlock>
              </Section>
            ))}

            <Section id="github">
              <H2>GitHub Storage</H2>
              <Divider />
              <SectionDesc>
                Poussez vos snapshots vers un repository GitHub prive pour restaurer une machine depuis
                n importe quel systeme.
              </SectionDesc>
              <CodeBlock language="bash">
                {`recovery-tui config set github.token ghp_xxxxxxxxxxxxxxxx
recovery-tui config set github.repo monuser/recovery-backup
recovery-tui config set github.branch main
recovery-tui backup --github`}
              </CodeBlock>
              <Alert icon="!">
                Ne commitez jamais le token GitHub. Il doit rester dans ~/.config/recovery-tui/config.yaml.
              </Alert>
            </Section>

            <Section id="compat">
              <H2>Compatibilite</H2>
              <Divider />
              <CompatGrid>
                {compatItems.map((item) => (
                  <CompatItem key={item.name}>
                    <CompatName>{item.name}</CompatName>
                    <CompatManager>{item.manager}</CompatManager>
                  </CompatItem>
                ))}
              </CompatGrid>
            </Section>

            <Section id="config-yaml">
              <H2>config.yaml - Reference complete</H2>
              <Divider />
              <SectionDesc>Fichier genere automatiquement dans ~/.config/recovery-tui/config.yaml.</SectionDesc>
              <CodeBlock language="yaml">{configYaml}</CodeBlock>
            </Section>

            <Section id="errors">
              <H2>Erreurs courantes</H2>
              <Divider />
              <CardsGrid>
                {errorItems.map((item) => (
                  <Card key={item.title} title={item.title} description={item.description} />
                ))}
              </CardsGrid>
            </Section>

            <Section id="tests">
              <H2>Tests & VM</H2>
              <Divider />
              <SectionDesc>La specification attend des tests unitaires, integration et simulation VM multi-distribution.</SectionDesc>
              <CodeBlock language="bash">
                {`pytest tests/ -v
pytest tests/unit/ -v --no-cov
pytest tests/integration/test_vm_simulation.py -v
RECOVERY_TUI_REAL_CMDS=1 pytest tests/integration/test_vm_simulation.py`}
              </CodeBlock>
            </Section>
          </Content>
        </Main>
      </MainLayout>
    </>
  );
}

export default App;
