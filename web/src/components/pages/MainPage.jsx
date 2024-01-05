import { Link, Outlet } from "react-router-dom";
import scss from "./MainPage.module.scss";

export default function MainPage() {
  return (
    <div className={scss.container}>
      <header className={scss.header}>
        <div className={scss.buttons}>
          <Link to="/monitor">Мониторинг</Link>
          {/* <Link to="/add">Добавить</Link> */}
          <Link to="/backups">Резервные копии</Link>
        </div>
        <div className={scss.actions}>
          <Link to="/monitor">Выйти</Link>
        </div>
      </header>
      <div className={scss.body}>
        <div className={scss.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
