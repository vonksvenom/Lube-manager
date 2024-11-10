import { Link, useLocation } from "react-router-dom";

const SidebarNav = ({ navItems, sidebarCollapsed }) => {
  const location = useLocation();

  return (
    <nav className="flex-1 p-4">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg ${
            location.pathname === item.to
              ? "bg-primary text-background translate-x-2"
              : "text-catYellow hover:bg-accent bg-gradient-to-br from-muted to-accent/10"
          } ${sidebarCollapsed ? 'justify-center' : ''}`}
          title={item.title}
        >
          {item.icon}
          {!sidebarCollapsed && <span>{item.title}</span>}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;