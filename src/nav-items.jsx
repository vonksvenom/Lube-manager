import { HomeIcon, Wrench, Settings, Calendar, Package, Users, Factory, Cog, Droplet } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Equipamentos from "./pages/Equipamentos";
import OrdensServico from "./pages/OrdensServico";
import Usuarios from "./pages/Usuarios";
import Inventario from "./pages/Inventario";
import Calendario from "./pages/Calendario";
import Areas from "./pages/Areas";
import ConfiguracoesAdmin from "./pages/ConfiguracoesAdmin";
import Lubrificantes from "./pages/Lubrificantes";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Ordens de Serviço",
    to: "/ordens",
    icon: <Settings className="h-4 w-4" />,
    page: <OrdensServico />,
  },
  {
    title: "Calendário",
    to: "/calendario",
    icon: <Calendar className="h-4 w-4" />,
    page: <Calendario />,
  },
  {
    title: "Inventário",
    to: "/inventario",
    icon: <Package className="h-4 w-4" />,
    page: <Inventario />,
  },
  {
    title: "Lubrificantes",
    to: "/lubrificantes",
    icon: <Droplet className="h-4 w-4" />,
    page: <Lubrificantes />,
  },
  {
    title: "Equipamentos",
    to: "/equipamentos",
    icon: <Wrench className="h-4 w-4" />,
    page: <Equipamentos />,
  },
  {
    title: "Áreas",
    to: "/areas",
    icon: <Factory className="h-4 w-4" />,
    page: <Areas />,
  },
  {
    title: "Usuários",
    to: "/usuarios",
    icon: <Users className="h-4 w-4" />,
    page: <Usuarios />,
  },
  {
    title: "Configurações Admin",
    to: "/admin/configuracoes",
    icon: <Cog className="h-4 w-4" />,
    page: <ConfiguracoesAdmin />,
    adminOnly: true,
  },
];