import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News =(props)=> {


  // static defaultProps={
  //   pageSize:10,
  //   country:"in",
  //   category:'general',
    

  // }
  // static propTypes={
  //   pageSize:PropTypes.number,
  //   country:PropTypes.string,
  //   category:PropTypes.string,
  //   apiKey:PropTypes.string


  // }
const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(false)
const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(null)
const [totResults,setTotResults]=useState(0);




    // constructor(props){
    //     super(props);
    //     this.state={
    //       articles:[],
    //       loading:false,
    //       page:1,
    //       pageSize:null
    //     }
       
    //     const str=props.category;
    //     document.title="TrendingTimes-"+str[0].toUpperCase()+str.slice(1);
        
        
    // }


//     next= async ()=>{
//       let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page+1}&pageSize=${this.state.pageSize}`;
//   this.setState({loading:true});
//       let data= await fetch(url);
// //  console.log(await data.json())
// let parsedData=await data.json();
// // console.log(parsedData)
// this.setState({articles:parsedData.articles,page:this.state.page+1,loading:false });
     

//     }
//     prev=async ()=>{
//       let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page-1}&pageSize=${this.state.pageSize}`;
//       this.setState({loading:true});
  
//       let data= await fetch(url);
// //  console.log(await data.json())
// let parsedData=await data.json();
// // console.log(parsedData)
// this.setState({articles:parsedData.articles,page:this.state.page-1,loading:false });

//     }

useEffect( () => {
          const str=props.category;
        document.title="TrendingTimes-"+str[0].toUpperCase()+str.slice(1);
  const cdm=async()=>{
  
      //console.log("This is cdm")
      props.setProgress(10);
      // this.setState({pageSize:props.pageSize})
      setPageSize(props.pageSize)
      let surl=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}`;
      // this.setState({loading:true});
      setLoading(true)
      props.setProgress(30);
      
    
      let tot=await fetch(surl);
      // totResults=(await tot.json()).totalResults
      setTotResults((await tot.json()).totalResults);
      //  console.log(this.totResults);
      props.setProgress(50);
    
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${pageSize}&page=${page}`;
      let data= await fetch(url);
      props.setProgress(70);
    
    //  console.log(await data.json())
    let parsedData=await data.json();
    // console.log(parsedData)
    // this.setState({articles:parsedData.articles,loading:false});
    setArticles(parsedData.articles);
    setLoading(false)
    props.setProgress(100);
  }
    //eslint-disable-next-line
  
  cdm();
    //eslint-disable-next-line
    
 
}, [])
    //eslint-disable-next-line


// const componentDidMount=async()=>{
//   //console.log("This is cdm")
//   props.setProgress(10);
//   // this.setState({pageSize:props.pageSize})
//   setPageSize(props.pageSize)
//   let surl=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}`;
//   // this.setState({loading:true});
//   setLoading(true)
//   props.setProgress(30);
  

//   let tot=await fetch(surl);
//   totResults=(await tot.json()).totalResults
//   //  console.log(this.totResults);
//   props.setProgress(50);

//   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${this.state.pageSize}&page=${this.state.page}`;
//   let data= await fetch(url);
//   props.setProgress(70);

// //  console.log(await data.json())
// let parsedData=await data.json();
// // console.log(parsedData)
// // this.setState({articles:parsedData.articles,loading:false});
// setArticles(parsedData.articles);
// setLoading(false)
// props.setProgress(100);


// }
const fetchMoreData=async()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${pageSize}`;
 // this.setState({loading:true});
      let data= await fetch(url);
//  console.log(await data.json())
let parsedData=await data.json();
// console.log(parsedData)
// this.setState({articles:this.state.articles.concat( parsedData.articles)});
setArticles(articles.concat(parsedData.articles));
// this.setState({page:this.state.page+1});
setPage(page+1)


};

 
    let {mode}=props;
  //  console.log("this is render")
    return (
      articles &&
      
 <div className={`container my-5 text-${mode==='dark'?'light':'dark'}`}>
      
          {/* {this.state.loading && <Spinner mode={mode} />   } */}


          <h2 style={{ marginTop:'100px'}} className="text-center ">TrendingTimes-Top {props.category==="general"?"":` ${props.category[0].toUpperCase()+props.category.slice(1)}`} Headlines</h2>
          
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totResults}
          loader={<Spinner mode={props.mode}  />}
        >
          <div className="container">
          <div className="row my-5" >

            {   articles.map((element)=>{
                    return element && <div key={element.url?element.url:""} className="col-md-4 mb-4 " >
                    <NewsItem mode={mode}  title={element.title} desc={element.description} imgUrl={element.urlToImage} more={element.url} date={element.publishedAt} author={element.author} source={element.source.name}/>
                  </div>
            })}
            
           
          </div>
          </div>
          </InfiniteScroll>

        {/* {!this.state.loading &&  <div className=" d-flex justify-content-between container my-5">
            <button disabled={this.state.page<=1} onClick={this.prev}  className={`btn btn-${mode==='dark'?'primary':'dark'}`}>&larr;Previous</button>
            <button disabled={this.state.page>=(this.totResults/this.state.pageSize)} onClick={this.next} style={{height:'65px',width:'90px'}} className={`btn btn-${mode==='dark'?'primary':'dark'}`}>Next &rarr;</button>
          </div>
  } */}

        </div>

      
    );
  }




News.defaultProps={
    pageSize:10,
    country:"in",
    category:'general',
    

  }

  News.propTypes={
    pageSize:PropTypes.number,
    country:PropTypes.string,
    category:PropTypes.string,
    apiKey:PropTypes.string


  }
export default News;
