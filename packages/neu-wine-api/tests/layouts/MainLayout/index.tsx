import { NavLink, Outlet } from 'react-router-dom';

export interface MainLayoutProps {
  headerText: string;
  menu: Array<{ text: string; route: string }>;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ headerText, menu }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '60px 1fr',
      }}
    >
      <div
        style={{
          borderBottom: '1px solid gray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          fontSize: 22,
          fontWeight: 'bold',
        }}
      >
        <div>{headerText}</div>
        <NavLink to="/">&lt; Home</NavLink>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
        <div style={{ borderRight: '1px solid gray', padding: 10 }}>
          {menu.map((item, index) => (
            <div style={{ paddingBottom: 10 }} key={index}>
              <NavLink to={item.route}>{item.text}</NavLink>
            </div>
          ))}
        </div>
        <div style={{ padding: 10 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
