import React, { memo, useMemo } from 'react';
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

  @media (max-width: 980px) {
    width: 100%;
    min-height: auto;
    max-height: 220px;
    position: sticky;
    border-right: 0;
    border-bottom: 1px solid #1e2535;
  }
`;

const Logo = styled.div`
  padding: 20px 20px 16px;
  border-bottom: 1px solid #1e2535;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  display: grid;
  place-items: center;
  color: #020617;
  font-weight: 800;
`;

const LogoText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #f1f5f9;
`;

const LogoSub = styled.div`
  font-size: 11px;
  color: #64748b;
  margin-top: 1px;
`;

const Nav = styled.div`
  padding: 12px 0;
  flex: 1;
`;

const NavSection = styled.div`
  padding: 4px 16px 2px;
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 8px;
`;

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  color: #94a3b8;
  font-size: 13px;
  cursor: pointer;
  border: 0;
  border-left: 2px solid transparent;
  background: transparent;
  font-family: inherit;
  text-align: left;
  transition: all 0.15s;

  &:hover,
  &:focus-visible {
    color: #e2e8f0;
    background: rgba(255, 255, 255, 0.04);
    outline: none;
  }

  &.active {
    color: #22c55e;
    background: rgba(34, 197, 94, 0.08);
    border-left-color: #22c55e;
  }
`;

const Dot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.5;
  flex-shrink: 0;
`;

const NavBadge = styled.span`
  margin-left: auto;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 3px;
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
`;

const SidebarFooter = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #1e2535;
  font-size: 11px;
  color: #64748b;
`;

const VersionPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 20px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 600;
`;

export const Sidebar = memo(({ activeId, onScrollTo }) => {
  const groups = useMemo(
    () =>
      navData.reduce((acc, item) => {
        acc[item.section] = acc[item.section] || [];
        acc[item.section].push(item);
        return acc;
      }, {}),
    [],
  );

  return (
    <SidebarWrapper aria-label="Navigation documentation">
      <Logo>
        <LogoIcon>R</LogoIcon>
        <div>
          <LogoText>RecoveryTUI</LogoText>
          <LogoSub>Documentation v1.0</LogoSub>
        </div>
      </Logo>

      <Nav>
        {Object.entries(groups).map(([section, items]) => (
          <React.Fragment key={section}>
            <NavSection>{section}</NavSection>
            {items.map((item) => (
              <NavItem
                key={item.id}
                type="button"
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
        <VersionPill>v1.0.0 stable</VersionPill>
        <div style={{ marginTop: 8, fontSize: 11 }}>Python 3.8+ - MIT License</div>
      </SidebarFooter>
    </SidebarWrapper>
  );
});

Sidebar.displayName = 'Sidebar';
