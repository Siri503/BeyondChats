import { Link } from "react-router-dom";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
          <li><Link to="/messages">Messages</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
