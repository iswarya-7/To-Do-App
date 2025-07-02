
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './components/home'
import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />


          <Route path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />  {/* children component */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
