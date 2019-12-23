import React from 'react';
import {Header} from '../../components/header/Header'
import {SideBar} from '../../components/SideBar/SideBar'
import {firebase} from '../../firebase'
export default class Home extends React.Component{

  componentDidMount(){
    
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.props.history.push("/");
    });
    
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
