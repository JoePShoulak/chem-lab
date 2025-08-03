import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.scss";
import Inventory from "./pages/Inventory";
import GlasswareDetail from "./pages/glassware/GlasswareDetail";
import CreateGlassware from "./pages/glassware/CreateGlassware";
import EditGlassware from "./pages/glassware/EditGlassware";
import PPEDetail from "./pages/ppe/PPEDetail";
import CreatePPE from "./pages/ppe/CreatePPE";
import EditPPE from "./pages/ppe/EditPPE";
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
