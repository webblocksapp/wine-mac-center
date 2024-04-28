import { NavLink } from 'react-router-dom';

const menu = [
  { text: 'Os', route: 'os' },
  { text: 'Winetricks', route: 'winetricks' },
  { text: 'Wine', route: 'wine' },
  { text: 'Curl', route: 'curl' },
];

export const Home: React.FC = () => (
  <div style={{ display: 'grid' }}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 17,
        width: '100%',
        maxWidth: 920,
        margin: 'auto',
      }}
    >
      {menu.map((item, index) => (
        <NavLink
          key={index}
          to={item.route}
          style={{ border: '1px solid gray', padding: 20, fontSize: 24 }}
        >
          {item.text}
        </NavLink>
      ))}
    </div>
  </div>
);
