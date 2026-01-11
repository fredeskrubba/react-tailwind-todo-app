import './App.css'
import 'react-contexify/ReactContexify.css';
import { Route } from "wouter";
import Login from './pages/Login.jsx'
import TodoList from './pages/TodoList.jsx';
import Notes from './pages/Notes.jsx';
import StartPage from './pages/Startpage.jsx';
import { ProtectedRoute } from './components/Layout/ProtectedRoute.jsx';

function App() {
  

  return (
    <>
      <Route path="/">  
        <StartPage />
      </Route>

      <Route path="/Login">
            <Login />
      </Route>

      <Route path="/TodoList">
        <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
      </Route>

      <Route path="/Notes">
        <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
      </Route>     
     
    </>
  )
}

export default App
