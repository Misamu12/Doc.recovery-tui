import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 14px 0;
  border: 1px solid #263044;
  border-radius: 8px;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  font-size: 13px;

  th {
    text-align: left;
    padding: 7px 10px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #64748b;
    border-bottom: 1px solid #1e2535;
    background: rgba(255, 255, 255, 0.02);
  }

  td {
    padding: 8px 10px;
    border-bottom: 1px solid rgba(30, 37, 53, 0.7);
    vertical-align: top;
    color: #94a3b8;
  }

  tr:last-child td {
    border-bottom: 0;
  }
`;

const CodeCell = styled.code`
  color: #86efac;
`;

const Badge = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: ${({ $required }) => ($required ? '#f87171' : '#64748b')};
  background: ${({ $required }) =>
    $required ? 'rgba(239, 68, 68, 0.1)' : 'rgba(100, 116, 139, 0.1)'};
  padding: 1px 5px;
  border-radius: 3px;
`;

export const Table = ({ columns, rows }) => (
  <Wrapper>
    <StyledTable>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.join('|')}>
            {row.map((cell, index) => (
              <td key={`${cell}-${index}`}>
                {index === 0 ? <CodeCell>{cell}</CodeCell> : index === 2 ? (
                  <Badge $required={cell === 'requis'}>{cell}</Badge>
                ) : (
                  cell
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </Wrapper>
);
