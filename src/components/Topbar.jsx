import styled from 'styled-components';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 52px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(15, 17, 23, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #1e2535;

  @media (max-width: 760px) {
    padding: 0 20px;
  }
`;

const Title = styled.div`
  font-size: 13px;
  color: #64748b;

  span {
    color: #e2e8f0;
    font-weight: 500;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.a`
  font-size: 12px;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid ${({ $primary }) => ($primary ? '#22c55e' : '#263044')};
  background: ${({ $primary }) => ($primary ? '#22c55e' : 'rgba(255, 255, 255, 0.04)')};
  color: ${({ $primary }) => ($primary ? '#020617' : '#94a3b8')};
  font-weight: ${({ $primary }) => ($primary ? 600 : 500)};
  transition: all 0.15s;

  &:hover {
    border-color: #22c55e;
    color: ${({ $primary }) => ($primary ? '#020617' : '#22c55e')};
    background: ${({ $primary }) => ($primary ? '#16a34a' : 'rgba(34, 197, 94, 0.08)')};
  }
`;

export const Topbar = () => (
  <Bar>
    <Title>
      Docs / <span>RecoveryTUI</span>
    </Title>
    <Actions>
      <Button href="https://github.com/Misamu12/recovery-tui" target="_blank" rel="noreferrer">
        GitHub
      </Button>
      <Button href="#install" $primary>
        Installer
      </Button>
    </Actions>
  </Bar>
);
