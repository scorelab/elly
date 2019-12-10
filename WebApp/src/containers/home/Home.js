import React from 'react';
import {Header} from '../../components/header/Header'
import {SideBar} from '../../components/SideBar/SideBar'

export default class Home extends React.Component{
  
  constructor(props){
    super(props)
    this.state={

    }
  }

  sideBarCallback = (child) => {
    console.log(child)
  }

  render(){
    return (
    <div >
      <Header/>
      <SideBar/>
      
    </div>
  );
  }
  
}
