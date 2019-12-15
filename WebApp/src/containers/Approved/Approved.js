import React from 'react';
import {generateResult} from '../../firebase/dataHandling'
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import firebase from 'firebase/app'
import PageHeader from '../../components/pageHeader/PageHeader'
import ObservationDialog from '../../components/ObservationDialog/ObservationDialog'
import SmallCard from '../../components/SmallCard/SmallCard'

class Approved extends React.Component{
  constructor(props){
    super(props)
    this.state={
      observations: [],
      showModal: false,
      item: 0,
      total: 0,
      rejected: 0,
      pending: 0,
      approved: 0
    }
  }
  componentDidMount(){
    firebase.database().ref("usersObservations").on("value", snapshot => {
      const result = snapshot.val()
      let observations = []
      let total = 0
      let rejected = 0
      let pending = 0
      let approved = 0
      for(let i in result){
        console.log(i)
        total = total + 1
        if(result[i].verified==='approved'){
          approved = approved+1
        }else if(result[i].verified==='pending'){
          
          pending = pending+1
          continue
        }else if(result[i].verified==='rejected'){
          rejected = rejected+1
          continue
        }else{
          continue
        }
        let user = result[i].uname
        let uid = result[i].uid
        let userPhoto = result[i].uimg
        let obPhoto = result[i].photoURL
        let time = new Date(result[i].time)
        time = time.toString().split(" ")
        time = time.splice(0, time.length - 4)
        time = time.toString().replace(/,/g, ' ')
        let results = generateResult(result[i])
        observations.unshift([user,userPhoto,obPhoto, time, results, i, uid])
        this.setState({observations: observations})
      }
      this.setState({
        total: total,
        rejected: rejected,
        pending: pending,
        approved: approved
      })
    })
  }

  reviewCard = (child)=>{
    this.setState({
      showModal: child[0],
      item: child[1]
    })
  }

  observationDialog = (child) => {
    console.log(child)
    this.setState({
      item: child
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
    
  };

  render(){
    return (
      <div style={{ marginTop:60,width: '100%' }}>
        <PageHeader title={'Dashboard'} subtitle={''}/>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <SmallCard type={'Total'} count={this.state.total} icon={'all_inbox'}/>
          <SmallCard type={'Approved'} count={this.state.approved} icon={'thumb_up'}/>
          <SmallCard type={'Pending'} count={this.state.pending} icon={'hourglass_empty'}/>
          <SmallCard type={'Rejected'} count={this.state.rejected} icon={'thumb_down'}/>
        </div>
        
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {this.state.observations.map((ob,i)=>{
            let component = []
            if(i===0 || this.state.observations[i-1][3].split(" ")[1]!==ob[3].split(" ")[1]){
              component.push( <h2 key={i+this.state.observations.length} style={{ display: 'block', width: "100%"}}>{ob[3].split(" ")[3]+" "+ob[3].split(" ")[1]}</h2>)
            
            }
            component.push(<ReviewCard 
                            verified={false} 
                            userId={ob[6]} 
                            id={ob[5]} 
                            user={ob[0]} 
                            userPhoto={ob[1]} 
                            obPhoto={ob[2]} 
                            time={ob[3]} 
                            result={ob[4]}  
                            key={i}
                            index={i}
                            parentCallback={this.reviewCard}
                          />)
            return component
          })}
          {this.state.observations.length>0?
            <ObservationDialog 
              userPhoto={this.state.observations[this.state.item][1]} 
              user={this.state.observations[this.state.item][0]} 
              time={this.state.observations[this.state.item][3]} 
              verified={false} 
              userId={this.state.observations[this.state.item][6]} 
              id={this.state.observations[this.state.item][5]} 
              img={this.state.observations[this.state.item][2]} 
              result={this.state.observations[this.state.item][4]} 
              open={this.state.showModal} 
              onClose={this.handleClose} 
              index={this.state.item}
              parentCallback={this.observationDialog}
              max={this.state.observations.length}
            />
          :
            null
          }
          
        </div>
        
      </div>
    );
  }
  
};

export default Approved;
