import React, { Component } from 'react'
export class NewsItem extends Component {
   
// constructor(){
//     super();
//     //console.log("This is new item constructor")
// }
  render() {
    let {mode,title,desc,imgUrl,more,date}=this.props;

    return (
      <div >
       <div className="card" style={{width: "23rem"}}>
       <span className="position-absolute top-0  translate-middle badge rounded-pill bg-success" style={{zIndex:1,left:"10%"}}>
    {this.props.source}
 
  </span>
  <img src={imgUrl} className="card-img-top" alt=""/>
  <div className={`card-body text-${mode==='dark'?'light':'dark'} `} style={{backgroundColor:`${mode==='dark'?'black':'white'}`}}>
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{desc}</p>
    <a rel='noreferrer' href={more} target="_blank" className={`btn btn-${mode==='dark'?'primary':'dark'}`}>Read More</a>
  <p className='my-3' ><small style={mode==='dark'?{color: 'rgba(255, 255, 255, .6)' } :{color: 'rgba(0, 0, 0, 0.6)' }} >Published: {(new Date(date).toGMTString())} <br/>Author: {this.props.author?this.props.author:"Unknown"}</small></p>
  
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem