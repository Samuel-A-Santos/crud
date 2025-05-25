import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/components/sideMenu.module.css';
import Icon1 from '../assets/Icone 1.svg';
import Icon2 from '../assets/Icone 2.svg';
import Icon3 from '../assets/Icone 3.svg';
import Icon4 from '../assets/Icone 4.svg';
import Icon5 from '../assets/Icone 5.svg';
import Icon6 from '../assets/Icone 6.svg';
import ActiveIcon1 from '../assets/Icone ativo 1.svg';
import ActiveIcon3 from '../assets/Icone ativo 3.svg';
import ActiveIcon4 from '../assets/Icone ativo 4.svg';
import ActiveIcon5 from '../assets/Icone ativo 5.svg';
import ActiveIcon6 from '../assets/Icone ativo 6.svg';

export const SideMenu = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: <img src={Icon1} alt="Home" />,
      activeIcon: <img src={ActiveIcon1} alt="Home Active" />,
      path: '/home',
    },
    {
      icon: <img src={Icon2} alt="Edit" />,
      activeIcon: <img src={Icon2} alt="Edit Active" />,
      path: '/edit',
    },
    {
      icon: <img src={Icon3} alt="New" />,
      activeIcon: <img src={ActiveIcon3} alt="New Active" />,
      path: '/new',
    },
    {
      icon: <img src={Icon4} alt="Notifications" />,
      activeIcon: <img src={ActiveIcon4} alt="Notifications Active" />,
      path: '/notifications',
    },
    {
      icon: <img src={Icon5} alt="History" />,
      activeIcon: <img src={ActiveIcon5} alt="History Active" />,
      path: '/history',
    },
    {
      icon: <img src={Icon6} alt="Profile" />,
      activeIcon: <img src={ActiveIcon6} alt="Profile Active" />,
      path: '/profile',
    },
  ];

  return (
    <nav className={styles.sideMenu}>
      <div className={styles.logo}> </div>
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`${styles.menuItem} ${
            location.pathname === item.path ? styles.active : ''
          }`}
        >
          {location.pathname === item.path ? item.activeIcon : item.icon}
        </Link>
      ))}
    </nav>
  );
};
