import { Outlet, useLocation, Link } from "react-router";
import classNames from "classnames";
import code from "../../assets/code.svg";

const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
];

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-start items-center h-12 px-4 text-black shadow-xs">
        <div className="h-7 my-auto">
          <Link to="/">
            <img className="h-7" src={code} alt="code" />
          </Link>
        </div>

        <nav className="flex gap-3 p-3">
          {links.map(({ path, label }) => (
            <Link
              key={label}
              to={path}
              className={classNames({
                "text-indigo-600": location.pathname === path,
                "hover:text-[#7729f4]": 1,
              })}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="p-4 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
