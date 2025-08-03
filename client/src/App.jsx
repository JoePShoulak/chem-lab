import { useEffect, useState } from "react";
import "./App.scss";
import ItemsList from "./pages/ItemsList";
import ItemDetail from "./pages/ItemDetail";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import { navigate } from "./navigation";

function Header() {
  return (
    <header className="app-header">
      <h1>My App Header</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      <p>© 2025 My App</p>
    </footer>
  );
}

function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav>
        <ul>
          <li>
            <a
              href="/"
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/items"
              onClick={e => {
                e.preventDefault();
                navigate("/items");
              }}
            >
              Items
            </a>
          </li>
          <li>
            <a
              href="/settings"
              onClick={e => {
                e.preventDefault();
                navigate("/settings");
              }}
            >
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  const renderRoute = () => {
    if (route.startsWith("/items/") && route.endsWith("/edit")) {
      const id = route.split("/")[2];
      return <EditItem id={id} />;
    }
    if (route === "/items/new") {
      return <CreateItem />;
    }
    if (route.startsWith("/items/") && route.split("/").length === 3) {
      const id = route.split("/")[2];
      return <ItemDetail id={id} />;
    }
    return <ItemsList />;
  };

  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-content">{renderRoute()}</main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
