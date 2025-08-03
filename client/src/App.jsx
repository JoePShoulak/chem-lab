// client/src/App.jsx
import "./App.scss";

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
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Items</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-content">
          <h2>Welcome to the main content area</h2>
          <p>This is where your page content will go.</p>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
