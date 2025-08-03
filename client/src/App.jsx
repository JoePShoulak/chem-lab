import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.scss";
import GlasswareList from "./pages/GlasswareList";
import GlasswareDetail from "./pages/GlasswareDetail";
import CreateGlassware from "./pages/CreateGlassware";
import EditGlassware from "./pages/EditGlassware";
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
      <p>© 2025 Joe Shoulak</p>
    </footer>
  );
}

function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function NavBar() {
  return (
    <nav className="app-nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/reference">Reference</Link>
        </li>
        <li>
          <Link to="/inventory">Inventory</Link>
        </li>
        <li>
          <Link to="/reactions">Reactions</Link>
        </li>
        <li>
          <Link to="/experiments">Experiments</Link>
        </li>
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
            <Route path="/inventory" element={<GlasswareList />} />
            <Route path="/inventory/new" element={<CreateGlassware />} />
            <Route path="/inventory/:id" element={<GlasswareDetail />} />
            <Route path="/inventory/:id/edit" element={<EditGlassware />} />
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
