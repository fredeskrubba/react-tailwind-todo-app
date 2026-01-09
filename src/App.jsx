import './App.css'
import 'react-contexify/ReactContexify.css';
import { Route } from "wouter";
import Login from './pages/Login.jsx'
import TodoList from './pages/TodoList.jsx';
import Notes from './pages/Notes.jsx';

function App() {
  

  return (
    <>
      <Route path="/" component={Login} />
      <Route path="/TodoList" component={TodoList} />  
      <Route path="/Notes" component={Notes} />      
     
    </>
  )
}

export default App
