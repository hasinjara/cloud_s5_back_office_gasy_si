import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import ActiveCrud from "./components/ActiveCrud/ActiveCrud";
import Voiture from "components/voiture/voiture";
import VoitureCrud from "components/VoitureCrud/VoitureCrud";
import Annonce from "views/examples/Annonce";
import MarqueCrud from "./components/MarqueCrud/MarqueCrud";
import CategorieCrud from "./components/CategorieCrud/CategorieCrud";
import BoiteCrud from "./components/BoiteCrud/BoiteCrud";
import EnergieCrud from "./components/EnergieCrud/EnergieCrud";
import FicheCrud from "./components/FicheCrud/FicheCrud";
import StatGlobal from "components/StatGlobal/StatGlobal";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/Marque",
    name: "Marque",
    icon: "ni ni-bullet-list-67 text-red",
    component: <MarqueCrud />,
    layout: "/admin",
  },
  {
    path: "/Categorie",
    name: "Categorie",
    icon: "ni ni-bullet-list-67 text-red",
    component: <CategorieCrud />,
    layout: "/admin",
  },
  {
    path: "/Boite",
    name: "Boite",
    icon: "ni ni-bullet-list-67 text-red",
    component: <BoiteCrud />,
    layout: "/admin",
  },
  {
    path: "/Energie",
    name: "Energie",
    icon: "ni ni-bullet-list-67 text-red",
    component: <EnergieCrud />,
    layout: "/admin",
  },
  {
    path: "/Voiture",
    name: "Voiture",
    icon: "bi bi-speedometer2",
    component: <VoitureCrud />,
    layout: "/admin",
  },
  {
    path: "/Fiche_technique",
    name: "Fiche technique",
    icon: "ni ni-bullet-list-67 text-red",
    component: <FicheCrud />,
    layout: "/admin",
  },
  {
    path: "/crud",
    name: "CRUD",
    icon: "ni ni-books text-orange",
    component: <ActiveCrud />,
    layout: "/admin",
  },
  {
    path: "/annonce",
    name: "Annonce",
    icon: "ni ni-books text-orange",
    component: <Annonce />,
    layout: "/admin",
  },
  {
    path: "/statglobal",
    name: "Stat Global",
    icon: "ni ni-books text-orange",
    component: <StatGlobal />,
    layout: "/admin",
  },
];
export default routes;
