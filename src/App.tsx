import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { SideMenu } from "./components/sideMenu";
import styles from "./App.module.css";
import Background from "./assets/Elementos de fundo.svg";
import { History } from "./pages/History";
import { New } from "./pages/New";
import { Profile } from "./pages/Profile";
import { Edit } from "./pages/Edit";
import { Notification } from "./pages/Notification";

function App() {
  return (
    <div className={styles.layout}>
      <img src={Background} alt="" className={styles.background} />
      <SideMenu />
      <main className={styles.content}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/new" element={<New />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
