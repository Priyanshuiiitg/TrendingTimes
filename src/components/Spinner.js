import React, { Component } from 'react'
import loading1 from './loading1.gif'
import loading from './loading.gif'


export class Spinner extends Component {
    
  render() {

    return (
        
        <div className="text-center">
            {this.props.mode==='dark'?<img style={{height:'150px',width:'150px'}} src={loading} alt=""  />:<img style={{height:"100px",width:"100px",backgroundColor:"white",borderRadius:"100%"}} src={loading1} alt=""/>}
        </div>
       
    )
  }
}

export default Spinner