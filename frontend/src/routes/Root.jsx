import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'; 
import Navbar from '../components/Navbar';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Root;
