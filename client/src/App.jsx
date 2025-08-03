import { useEffect, useState } from "react";
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
            <a href="#/">Dashboard</a>
          </li>
          <li>
            <a href="#/glassware">Glassware</a>
          </li>
          <li>
            <a href="#/settings">Settings</a>
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
          <a href="#/">Home</a>
        </li>
        <li>
          <a href="#/reference">Reference</a>
        </li>
        <li>
          <a href="#/glassware">Inventory</a>
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

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const renderRoute = () => {
    if (route.startsWith("#/glassware/") && route.endsWith("/edit")) {
      const id = route.split("/")[2];
      return <EditGlassware id={id} />;
    }
    if (route === "#/glassware/new") {
      return <CreateGlassware />;
    }
    if (route.startsWith("#/glassware/") && route.split("/").length === 3) {
      const id = route.split("/")[2];
      return <GlasswareDetail id={id} />;
    }
    if (route === "#/reference") {
      return <Reference />;
    }
    if (
      route === "#/glassware" ||
      route === "#/inventory" ||
      route === "#/" ||
      route === "" ||
      route === "#"
    ) {
      return <GlasswareList />;
    }
    return <GlasswareList />;
  };

  const isInventoryPage =
    route === "#/glassware" ||
    route === "#/inventory" ||
    route === "#/" ||
    route === "" ||
    route === "#";

  return (
    <div className="app-container">
      <Header />
      <NavBar />
      <div className="app-body">
        {isInventoryPage && <Sidebar />}
        <main className="app-content">{renderRoute()}</main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
