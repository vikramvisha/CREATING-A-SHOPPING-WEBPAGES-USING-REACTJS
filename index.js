import ReactDOM from 'react-dom';
import React,{useState,useReducer} from 'react';
import Header from'./component/header';
function Message(){
  return(
  <div>
  <Header/>
  </div>
  )
}
ReactDOM.render(<Message/>,document.getElementById("root"));