import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tracking from './pages/Tracking';
import Timeline from './pages/Timeline';
import About from './pages/About';
import Detail from './pages/Detail';
import Globe from './pages/Globe';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/globe" element={<Globe />} />
              <Route path="/about" element={<About />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={(
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                )}
              />
            </Routes>
          </Layout>
        </HashRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
