import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Notes } from './pages/Notes';
import { Admin } from './pages/Admin';

// Placeholder components for other routes to ensure app doesn't break
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="max-w-7xl mx-auto px-4 py-20 text-center">
    <h1 className="text-3xl font-bold text-slate-800 mb-4">{title}</h1>
    <p className="text-slate-500">This section is currently under construction. Check back soon!</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="notes" element={<Notes />} />
          <Route path="one-shots" element={<PlaceholderPage title="One-Shot Station 🎥" />} />
          <Route path="strategy" element={<PlaceholderPage title="Strategy Hub 💡" />} />
          <Route path="pyqs" element={<PlaceholderPage title="PYQ Archive 📝" />} />
        </Route>

        {/* Hidden Admin Route - Not wrapped in Layout to hide Navbar/Footer */}
        <Route path="/secure-dashboard-9823" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
