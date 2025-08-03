import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.scss";
import Inventory from "./pages/Inventory";
import GlasswareDetail from "./pages/glassware/GlasswareDetail";
import CreateGlassware from "./pages/glassware/CreateGlassware";
import EditGlassware from "./pages/glassware/EditGlassware";
import PPEDetail from "./pages/ppe/PPEDetail";
import CreatePPE from "./pages/ppe/CreatePPE";
import EditPPE from "./pages/ppe/EditPPE";
import EquipmentDetail from "./pages/equipment/EquipmentDetail";
import CreateEquipment from "./pages/equipment/CreateEquipment";
import EditEquipment from "./pages/equipment/EditEquipment";
import ChemicalDetail from "./pages/chemicals/ChemicalDetail";
import CreateChemical from "./pages/chemicals/CreateChemical";
import EditChemical from "./pages/chemicals/EditChemical";
import MiscDetail from "./pages/misc/MiscDetail";
import CreateMisc from "./pages/misc/CreateMisc";
import EditMisc from "./pages/misc/EditMisc";
import Reference from "./pages/Reference";

function Header() {
  return (
    <header className="app-header">
      <h1>Chem Lab</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      <p>Joe Shoulak © 2025</p>
    </footer>
  );
}

function MyLink({ to, children }) {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
}

function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav>
        <ul>
          <MyLink to="/inventory?type=all">All</MyLink>
          <MyLink to="/inventory?type=glassware">Glassware</MyLink>
          <MyLink to="/inventory?type=ppe">PPE</MyLink>
          <MyLink to="/inventory?type=equipment">Equipment</MyLink>
          <MyLink to="/inventory?type=chemicals">Chemicals</MyLink>
          <MyLink to="/inventory?type=misc">Misc</MyLink>
        </ul>
      </nav>
    </aside>
  );
}

function NavBar() {
  return (
    <nav className="app-nav">
      <ul>
        <MyLink to="/">Home</MyLink>
        <MyLink to="/reference">Reference</MyLink>
        <MyLink to="/inventory">Inventory</MyLink>
        <MyLink to="/reactions">Reactions</MyLink>
        <MyLink to="/experiments">Experiments</MyLink>
      </ul>
    </nav>
  );
}

function App() {
  const location = useLocation();
  return (
    <div className="app-container">
      <Header />
      <NavBar />
      <div className="app-body">
        {location.pathname === "/inventory" && <Sidebar />}
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/inventory" replace />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/glassware/new" element={<CreateGlassware />} />
            <Route path="/glassware/:id" element={<GlasswareDetail />} />
            <Route path="/glassware/:id/edit" element={<EditGlassware />} />
            <Route path="/ppe/new" element={<CreatePPE />} />
            <Route path="/ppe/:id" element={<PPEDetail />} />
            <Route path="/ppe/:id/edit" element={<EditPPE />} />
            <Route path="/equipment/new" element={<CreateEquipment />} />
            <Route path="/equipment/:id" element={<EquipmentDetail />} />
            <Route path="/equipment/:id/edit" element={<EditEquipment />} />
            <Route path="/chemicals/new" element={<CreateChemical />} />
            <Route path="/chemicals/:id/edit" element={<EditChemical />} />
            <Route path="/chemicals/:id" element={<ChemicalDetail />} />
            <Route path="/misc/new" element={<CreateMisc />} />
            <Route path="/misc/:id/edit" element={<EditMisc />} />
            <Route path="/misc/:id" element={<MiscDetail />} />
            <Route path="/reference" element={<Reference />} />
            <Route path="*" element={<Navigate to="/inventory" replace />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
