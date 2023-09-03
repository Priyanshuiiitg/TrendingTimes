import './App.css';
import Navbar from './components/Navbar';


import React, { useState, useEffect } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';


import {
  HashRouter as Router,
  Routes,
  Route
 

} from "react-router-dom";


// export default class App extends Component {
//   //name="Hell_world"
const App=()=>{
 const apiKey=process.env.REACT_APP_NEWSAPP_API;
  const [mode, setMode] = useState('dark')
  const [line, setLine] = useState('Disable')
const [progress,newProgress]=useState(0);
  
// constructor(){
//   super();
//   state={
//     mode:'dark',
//     line:"Disable",
   
//   }
// }

 const toggle=()=>{
  if(mode==='light')
  {
    document.body.style.backgroundColor='black';
    // setState({mode:'dark',line:'Disable'});
    setMode('dark')
    setLine('Disable')

    
  }
  else{
    document.body.style.backgroundColor='white';
    // setState({mode:'light',line:'Enable'});
    setMode('light')
    setLine('Enable')

  }
}

// componentDidMount=()=>{
//   document.body.style.backgroundColor="black"

// }
useEffect(() => {
  document.body.style.backgroundColor='black';
}, [])


 const setProgress=(progress)=>{
  newProgress(progress);
}

  
    
    return (
      <Router>

      <div>
      <Navbar toggle={toggle} mode={mode} line={line}/>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        
      />
      <Routes>
        <Route exact path="/" element={ <News setProgress={setProgress} apiKey={apiKey} key="general"  pageSize={10} country='in' mode={mode} category="general"/>} />
        <Route exact path="/business" element={ <News setProgress={setProgress} apiKey={apiKey}  key="business"  pageSize={10} country='in' mode={mode} category="business"/>} />
        <Route exact path="/entertainment" element={ <News setProgress={setProgress} apiKey={apiKey}  key="entertainment"  pageSize={10} country='in' mode={mode} category="entertainment"/>} />
        <Route exact path="/technology" element={ <News setProgress={setProgress} apiKey={apiKey}   key="technology" pageSize={10} country='in' mode={mode} category="technology"/>} />
        <Route exact path="/science" element={ <News setProgress={setProgress} apiKey={apiKey}  key="science"  pageSize={10} country='in' mode={mode} category="science"/>} />
        <Route exact path="/sports" element={ <News setProgress={setProgress} apiKey={apiKey}  key="sports"  pageSize={10} country='in' mode={mode} category="sports"/>} />
        <Route exact path="/health" element={ <News setProgress={setProgress} apiKey={apiKey}  key="health"  pageSize={10} country='in' mode={mode} category="health"/>} />
       


      </Routes>
     
      

      </div>
      </Router>
    )
  
}

export default App