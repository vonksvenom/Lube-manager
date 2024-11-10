import { HomeIcon, Tool, Settings, Calendar, Package } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Equipamentos from "./pages/Equipamentos";
import OrdensServico from "./pages/OrdensServico";
import Manutencoes from "./pages/Manutencoes";
import Estoque from "./pages/Estoque";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Equipamentos",
    to: "/equipamentos",
    icon: <Tool className="h-4 w-4" />,
    page: <Equipamentos />,
  },
  {
    title: "Ordens de Serviço",
    to: "/ordens",
    icon: <Settings className="h-4 w-4" />,
    page: <OrdensServico />,
  },
  {
    title: "Manutenções",
    to: "/manutencoes",
    icon: <Calendar className="h-4 w-4" />,
    page: <Manutencoes />,
  },
  {
    title: "Estoque",
    to: "/estoque",
    icon: <Package className="h-4 w-4" />,
    page: <Estoque />,
  },
];