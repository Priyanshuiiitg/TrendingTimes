import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {


  static defaultProps={
    pageSize:10,
    country:"in",
    category:'general',
    

  }
  static propTypes={
    pageSize:PropTypes.number,
    country:PropTypes.string,
    category:PropTypes.string,
    apiKey:PropTypes.string


  }
totResults=0;
    constructor(props){
        super(props);
        this.state={
          articles:[],
          loading:false,
          page:1,
          pageSize:null
        }
       
        const str=this.props.category;
        document.title="TrendingTimes-"+str[0].toUpperCase()+str.slice(1);
        
        
    }


    next= async ()=>{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.state.pageSize}`;
  this.setState({loading:true});
      let data= await fetch(url);
//  console.log(await data.json())
let parsedData=await data.json();
// console.log(parsedData)
this.setState({articles:parsedData.articles,page:this.state.page+1,loading:false });
     

    }
    prev=async ()=>{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.state.pageSize}`;
      this.setState({loading:true});
  
      let data= await fetch(url);
//  console.log(await data.json())
let parsedData=await data.json();
// console.log(parsedData)
this.setState({articles:parsedData.articles,page:this.state.page-1,loading:false });

    }
async componentDidMount(){
  //console.log("This is cdm")
  this.props.setProgress(10);
  this.setState({pageSize:this.props.pageSize})
  let surl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}`;
  this.setState({loading:true});
  this.props.setProgress(30);

  let tot=await fetch(surl);
  this.totResults=(await tot.json()).totalResults
  //  console.log(this.totResults);
  this.props.setProgress(50);

  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.state.pageSize}&page=${this.state.page}`;
  let data= await fetch(url);
  this.props.setProgress(70);

//  console.log(await data.json())
let parsedData=await data.json();
// console.log(parsedData)
this.setState({articles:parsedData.articles,loading:false});
this.props.setProgress(100);


}
fetchMoreData=async()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.state.pageSize}`;
 // this.setState({loading:true});
      let data= await fetch(url);
//  console.log(await data.json())
let parsedData=await data.json();
// console.log(parsedData)
this.setState({articles:this.state.articles.concat( parsedData.articles)});
this.setState({page:this.state.page+1});

};

  render() {
    let {mode}=this.props;
  //  console.log("this is render")
    return (
      this.state.articles &&
      
 <div className={`container my-5 text-${mode==='dark'?'light':'dark'}`}>
      
          {/* {this.state.loading && <Spinner mode={mode} />   } */}


          <h2 className="text-center">TrendingTimes-Top {this.props.category==="general"?"":` ${this.props.category[0].toUpperCase()+this.props.category.slice(1)}`} Headlines</h2>
          
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.totResults}
          loader={<Spinner mode={this.props.mode}  />}
        >
          <div className="container">
          <div className="row my-5" >

            {   this.state.articles.map((element)=>{
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
}

export default News;
