
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './assets/components/home'
import Register from './assets/components/register'
import Login from './assets/components/login'
import Dashboard from './assets/components/dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddTask1 from './assets/components/AddTask1'
import UpdateTask from './assets/components/UpdateTask'
import NotFound from './assets/components/NotFound'
import ProtectedRoute from './assets/components/ProtectedRoute'


function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addtask" element={<AddTask1 />} />
          <Route path="/updatetask" element={<UpdateTask />} />
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
