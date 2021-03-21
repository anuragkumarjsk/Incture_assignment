import './App.css';
import Form from './components/form'
import ShowRecords from './components/show_records'
import ModifyRecords from './components/modify_records'
import Home from './components/home'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function App() {
  return (

    <div className="App">
        <div>
                    <Router>
             
            <header>
                <nav>
                    <h1>Leave Application</h1>
                  
                    <ul>
                      <li><Link to="/home">Home</Link> </li>
                      <li><Link to="/apply">Apply Leave</Link> </li>
                      <li><Link to="/showrecords">Show Records</Link> </li>
                      <li><Link to="/modifyrecords">Modify Records</Link> </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/home"><Home/></Route>
                    <Route path="/apply" ><Form/></Route>
                    <Route path="/showrecords"><ShowRecords/></Route>
                    <Route path="/modifyrecords"><ModifyRecords/></Route>
                </Switch>
              
            </main>
        
            </Router>
        </div>
</div>
  );
}

export default App;
