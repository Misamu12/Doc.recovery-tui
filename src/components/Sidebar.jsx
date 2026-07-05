// components/Sidebar.jsx
import React from 'react';
import styled from 'styled-components';
import { navData } from '../data/navData';

const SidebarWrapper = styled.nav`
  width: 260px;
  min-height: 100vh;
  background: #161b27;
  border-right: 1px solid #1e2535;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

// ... (autres styles : Logo, NavItem, etc. – reprenez ceux du fichier précédent)
// Je les condense ici pour la lisibilité, mais ils sont identiques à la version précédente.

export const Sidebar = ({ activeId, onScrollTo }) => {
  // Grouper par section
  const groups = navData.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <SidebarWrapper>
      {/* Logo */}
      {/* ... */}
      <Nav>
        {Object.entries(groups).map(([section, items]) => (
          <React.Fragment key={section}>
            <NavSection>{section}</NavSection>
            {items.map(item => (
              <NavItem
                key={item.id}
                className={activeId === item.id ? 'active' : ''}
                onClick={() => onScrollTo(item.id)}
              >
                <Dot />
                {item.label}
                {item.badge && <NavBadge>{item.badge}</NavBadge>}
              </NavItem>
            ))}
          </React.Fragment>
        ))}
      </Nav>
      <SidebarFooter>
        <VersionPill>● v1.0.0 stable</VersionPill>
        <div style={{ marginTop: 8, fontSize: 11 }}>Python 3.8+ · MIT License</div>
      </SidebarFooter>
    </SidebarWrapper>
  );
};