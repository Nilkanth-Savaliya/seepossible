"use client";
import { useRouter } from "next/navigation";
import Menu from "./components/menu";
import Cookies from "js-cookie";

const Sidebar = () => {
  const router = useRouter();
  const navigationData = [
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: (
        <svg
          className="w-5 h-5 text-white transition duration-75 group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
    }
  ];

  const handleLogout = () => {
    Cookies.remove("user-info");
    router.push("/login");
  };

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-[64px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 relative overflow-y-auto bg-primary">
        <ul className="space-y-2 font-medium">
          {navigationData.map((item) => {
            return <Menu {...item} key={item.label} />;
          })}
        </ul>
        <button
          className="absolute bottom-20 w-[-webkit-fill-available] left-0 px-4 py-2 text-sm mx-4 font-medium text-white bg-red-500 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
