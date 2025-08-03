import { Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import ItemsList from "./pages/ItemsList";
import ItemDetail from "./pages/ItemDetail";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
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
            <Link to="/items">Items</Link>
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
          <Link to="/items">Inventory</Link>
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
  return (
    <div className="app-container">
      <Header />
      <NavBar />
      <div className="app-body">
        <Sidebar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<ItemsList />} />
            <Route path="/items" element={<ItemsList />} />
            <Route path="/inventory" element={<ItemsList />} />
            <Route path="/items/new" element={<CreateItem />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/items/:id/edit" element={<EditItem />} />
            <Route path="/reference" element={<Reference />} />
            <Route path="*" element={<ItemsList />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
