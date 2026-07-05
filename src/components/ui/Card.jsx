import styled from 'styled-components';

const CardBox = styled.article`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #263044;
  border-radius: 8px;
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 13px;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0 0 4px;
`;

const Description = styled.p`
  font-size: 12px;
  color: #64748b;
  line-height: 1.55;
  margin: 0;
`;

export const Card = ({ title, description }) => (
  <CardBox>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </CardBox>
);
