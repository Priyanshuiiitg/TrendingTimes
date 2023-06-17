import './App.css';
import Navbar from './components/Navbar';

import React, { Component } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';


import {
  HashRouter as Router,
  Routes,
  Route
 

} from "react-router-dom";


export default class App extends Component {
  //name="Hell_world"

  apiKey=process.env.REACT_APP_NEWSAPP_API;
constructor(){
  super();
  this.state={
    mode:'dark',
    line:"Disable",
   
  }
}

toggle=()=>{
  if(this.state.mode==='light')
  {
    document.body.style.backgroundColor='black';
    this.setState({mode:'dark',line:'Disable'});

    
  }
  else{
    document.body.style.backgroundColor='white';
    this.setState({mode:'light',line:'Enable'});
  }
}
componentDidMount=()=>{
  document.body.style.backgroundColor="black"

}
state={
  progress:0
}

setProgress=(progress)=>{
  this.setState({progress:progress})
}

  render() {
    
    return (
      <Router>

      <div>
      <Navbar toggle={this.toggle} mode={this.state.mode} line={this.state.line}/>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
        
      />
      <Routes>
        <Route exact path="/" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} key="general"  pageSize={10} country='in' mode={this.state.mode} category="general"/>} />
        <Route exact path="/business" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key="business"  pageSize={10} country='in' mode={this.state.mode} category="business"/>} />
        <Route exact path="/entertainment" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment"  pageSize={10} country='in' mode={this.state.mode} category="entertainment"/>} />
        <Route exact path="/technology" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}   key="technology" pageSize={10} country='in' mode={this.state.mode} category="technology"/>} />
        <Route exact path="/science" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key="science"  pageSize={10} country='in' mode={this.state.mode} category="science"/>} />
        <Route exact path="/sports" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports"  pageSize={10} country='in' mode={this.state.mode} category="sports"/>} />
        <Route exact path="/health" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key="health"  pageSize={10} country='in' mode={this.state.mode} category="health"/>} />
       


      </Routes>
     
      

      </div>
      </Router>
    )
  }
}
