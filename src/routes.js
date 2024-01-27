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

import AnnonceDetail from "views/examples/AnnonceDetail";
import SearchRep from "views/examples/SearchRep";
import AnnonceValid from "views/examples/AnnonceValid";
import AnnonceVendu from "views/examples/AnnonceVendu";
import AnnonceNonValid from "views/examples/AnnonceNonValid";
import AnnonceRefus from "views/examples/AnnonceRefus";
import StatTest from "components/StatTest/StatTest";
import StatAnnuel from "components/StatAnnuel/StatAnnuel";

var routes = [
  {
    path: "/index",
    name: "Admin page",
    icon: "bi bi-house",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/Marque",
    name: "Marque",
    icon: "bi bi-nut",
    component: <MarqueCrud />,
    layout: "/admin",
  },
  {
    path: "/Categorie",
    name: "Categorie",
    icon: "bi bi-stickies",
    component: <CategorieCrud />,
    layout: "/admin",
  },
  {
    path: "/Boite",
    name: "Boite",
    icon: "bi bi-box",
    component: <BoiteCrud />,
    layout: "/admin",
  },
  {
    path: "/Energie",
    name: "Energie",
    icon: "bi bi-lightning-charge",
    component: <EnergieCrud />,
    layout: "/admin",
  },
  {
    path: "/Voiture",
    name: "Voiture",
    icon: "bi bi-car-front",
    component: <VoitureCrud />,
    layout: "/admin",
  },
  {
    path: "/Fiche_technique",
    name: "Fiche technique",
    icon: "bi bi-collection",
    component: <FicheCrud />,
    layout: "/admin",
  },
  // {
  //   path: "/crud",
  //   name: "CRUD",
  //   icon: "ni ni-books text-orange",
  //   component: <ActiveCrud />,
  //   layout: "/admin",
  // },
  {
    path: "/annonceValid",
    name: "Annonces Validées",
    icon: "bi bi-clipboard-check",
    component: <AnnonceValid />,
    layout: "/admin",
  },
  {
    path: "/annonceNonValid",
    name: "Annonces Non Validées",
    icon: "bi bi-clipboard-minus",
    component: <Annonce />,
    layout: "/admin",
  },
  {
    path: "/annonceVendu",
    name: "Annonces Vendues",
    icon: "bi bi-clipboard-plus",
    component: <AnnonceVendu />,
    layout: "/admin",
  },
  {
    path: "/annonceRefus",
    name: "Annonces Refusées",
    icon: "bi bi-clipboard-x",
    component: <AnnonceRefus />,
    layout: "/admin",
  },
  {
    path: "/statglobal",
    name: "Stat Global",
    icon: "bi bi-clipboard-data",
    component: <StatGlobal />,
    layout: "/admin",
  },
  
  {
    path: "/annonceDetail/:idAnnonce",
    name: "AnnonceDetail",
    icon: "bi bi-clipboard",
    component: <AnnonceDetail />,
    layout: "/admin",
    hide: "true",
  },

  {
    path: "/search",
    name: "Search",
    icon: "bi bi-search",
    component: <SearchRep />,
    layout: "/admin",
    hide: "true",

  },
  {
    path: "/statannuel",
    name: "Stat Annuel",
    icon: "bi bi-bar-chart",
    component: <StatAnnuel />,
    layout: "/admin",
  },
];
export default routes;
