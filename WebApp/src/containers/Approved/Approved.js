import React from 'react';
import {generateResult} from '../../firebase/dataHandling'
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import firebase from 'firebase/app'
import PageHeader from '../../components/pageHeader/PageHeader'
class Approved extends React.Component{
  constructor(props){
    super(props)
    this.state={
      observations: []
    }
  }
  componentDidMount(){
    firebase.database().ref("users").on("value", snapshot => {
      const result = snapshot.val()
      let observations = []
      for(let i in result){
        let user = result[i].name
        let userPhoto = result[i].photo
        let userObs = result[i].observations
        for(let j in userObs){
          if(!userObs[j].verified){continue}
          //console.log(userObs[j])
          let obPhoto = userObs[j].photoURL
          let time = new Date(userObs[j].time)
          time = time.toString().split(" ")
          time = time.splice(0, time.length - 4)
          time = time.toString().replace(/,/g, ' ')
          let result = generateResult(userObs[j])
          observations.push([user,userPhoto,obPhoto, time, result, j, i])
          this.setState({observations: observations})
        }
      }
    })
  }
  render(){
    return (
      <div style={{ marginTop:60,width: '100%' }}>
          <PageHeader title={'Approved Observations'} subtitle={''}/>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {this.state.observations.map((ob,i)=>{
              return <ReviewCard verified={true} userId={ob[6]} id={ob[5]} user={ob[0]} userPhoto={ob[1]} obPhoto={ob[2]} time={ob[3]} result={ob[4]}  key={i}/>
            })}
          </div>
          
      </div>
    );
  }
  
};

export default Approved;
