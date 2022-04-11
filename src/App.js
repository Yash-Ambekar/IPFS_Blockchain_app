import './App.css';
import MainHomePage from './Components/IPFS';
import Search from './Components/Search';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

function App() {

  return (
    <>
    <Router>
      <Switch>
        <Route  path="/" element={<MainHomePage/>}/>
        <Route  path="/search" element={<Search/>}/>
     </Switch>
    </Router>
    </>
  );
}

export default App;
