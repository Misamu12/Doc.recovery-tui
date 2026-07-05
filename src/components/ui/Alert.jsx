// components/ui/Alert.jsx
import styled from 'styled-components';

const AlertBox = styled.div`
  border-radius: 8px;
  padding: 12px 16px;
  margin: 16px 0;
  display: flex;
  gap: 10px;
  font-size: 13px;
  line-height: 1.6;
  background: ${props => props.bg || 'rgba(59,130,246,0.07)'};
  border: 1px solid ${props => props.border || 'rgba(59,130,246,0.2)'};
  color: ${props => props.color || '#93c5fd'};
`;

const Icon = styled.span`
  font-size: 15px;
  flex-shrink: 0;
  margin-top: 1px;
`;

export const Alert = ({ icon, bg, border, color, children }) => (
  <AlertBox bg={bg} border={border} color={color}>
    <Icon>{icon || 'ℹ'}</Icon>
    <span>{children}</span>
  </AlertBox>
);