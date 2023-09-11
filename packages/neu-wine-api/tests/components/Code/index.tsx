export interface CodeProps {
  content: string;
  label?: string;
}

export const Code: React.FC<CodeProps> = ({ content, label }) => (
  <div style={{ margin: '17px 0px' }}>
    {label ? <label>Output:</label> : <></>}
    <pre
      style={{
        border: '1px solid gray',
        background: '#d6d6d6',
        minHeight: 40,
        width: '100%',
      }}
    >
      <code>{JSON.stringify(content, null, 2)}</code>
    </pre>
  </div>
);
