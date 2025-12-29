import './App.css'
import { Route } from "wouter";
import Login from './pages/Login.jsx'
import TodoList from './pages/TodoList.jsx';

function App() {
  

  return (
    <>
      <Route path="/" component={Login} />
      <Route path="/TodoList" component={TodoList} />        
     
    </>
  )
}

export default App
