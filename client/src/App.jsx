import { useEffect, useState } from "react";
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

function Sidebar({ filter, setFilter }) {
  const filters = ["All", "Glassware", "Chemicals", "PPE", "Equipment"];
  return (
    <aside className="app-sidebar">
      <ul>
        {filters.map(f => (
          <li key={f}>
            <a
              href="#"
              className={filter === f ? "active" : ""}
              onClick={e => {
                e.preventDefault();
                setFilter(f);
              }}
            >
              {f}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function NavBar() {
  return (
    <nav className="app-nav">
      <ul>
        <li>
          <a href="#/">Home</a>
        </li>
        <li>
          <a href="#/reference">Reference</a>
        </li>
        <li>
          <a href="#/items">Inventory</a>
        </li>
        <li>
          <a href="#/reactions">Reactions</a>
        </li>
        <li>
          <a href="#/experiments">Experiments</a>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const renderRoute = () => {
    if (route.startsWith("#/items/") && route.endsWith("/edit")) {
      const id = route.split("/")[2];
      return <EditItem id={id} />;
    }
    if (route === "#/items/new") {
      return <CreateItem />;
    }
    if (route.startsWith("#/items/") && route.split("/").length === 3) {
      const id = route.split("/")[2];
      return <ItemDetail id={id} />;
    }
    if (route === "#/reference") {
      return <Reference />;
    }
    if (
      route === "#/items" ||
      route === "#/inventory" ||
      route === "#/" ||
      route === "" ||
      route === "#"
    ) {
      return <ItemsList filter={filter} />;
    }
    return <ItemsList filter={filter} />;
  };

  return (
    <div className="app-container">
      <Header />
      <NavBar />
      <div className="app-body">
        <Sidebar filter={filter} setFilter={setFilter} />
        <main className="app-content">{renderRoute()}</main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
