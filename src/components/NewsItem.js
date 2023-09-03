// import React, { Component } from 'react'
import React from "react"
// export class NewsItem extends Component {
   const NewsItem=(props)=>{
// constructor(){
//     super();
//     //console.log("This is new item constructor")
// }
  // render() {
  //   let {mode,title,desc,imgUrl,more,props.date}=this.props;

    return (
      <div >
       <div className="card" style={{width: "23rem"}}>
       <span className="position-absolute top-0  translate-middle badge rounded-pill bg-success" style={{zIndex:1,left:"10%"}}>
    {props.source}
 
  </span>
  <img src={props.imgUrl} className="card-img-top" alt=""/>
  <div className={`card-body text-${props.mode==='dark'?'light':'dark'} `} style={{backgroundColor:`${props.mode==='dark'?'black':'white'}`}}>
    <h5 className="card-props.title">{props.title}</h5>
    <p className="card-text">{props.desc}</p>
    <a rel='noreferrer' href={props.more} target="_blank" className={`btn btn-${props.mode==='dark'?'primary':'dark'}`}>Read more</a>
  <p className='my-3' ><small style={props.mode==='dark'?{color: 'rgba(255, 255, 255, .6)' } :{color: 'rgba(0, 0, 0, 0.6)' }} >Published: {(new Date(props.date).toGMTString())} <br/>Author: {props.author?props.author:"Unknown"}</small></p>
  
  </div>
</div>
      </div>
    )
  
}

export default NewsItem



