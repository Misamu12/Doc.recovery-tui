// components/ui/CodeBlock.jsx
import { useState } from 'react';
import styled from 'styled-components';

const Block = styled.div`
  background: #1a2035;
  border: 1px solid #1e2d4a;
  border-radius: 10px;
  overflow: hidden;
  margin: 16px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid #1e2d4a;
`;

const Lang = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
  }
`;

const CopyBtn = styled.button`
  font-size: 11px;
  color: #64748b;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #263044;
  background: transparent;
  font-family: inherit;
  transition: all 0.15s;
  &:hover { color: #e2e8f0; border-color: #94a3b8; }
`;

const Pre = styled.pre`
  padding: 16px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  line-height: 1.7;
  tab-size: 2;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);
  const text = String(children ?? '').trim();

  const handleCopy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Block>
      <Header>
        <Lang>{language}</Lang>
        <CopyBtn onClick={handleCopy}>{copied ? '✓ Copié!' : 'Copier'}</CopyBtn>
      </Header>
      <Pre>{text}</Pre>
    </Block>
  );
};
