import database from '@react-native-firebase/database';
export const getObservations = async function (){
    const ref = database().ref('/users/');
    
    // Fetch the data snapshot
    const snapshot = await ref.once('value');

    const val = snapshot.val()

    let observations = []

    for(let i in val){
        let name = val[i].name
        let photo = val[i].photo
        //console.log(name)
        //console.log(photo)
        let userNick = val[i].name.toLowerCase().replace(/ /g, '')
        let obs = val[i].observations
        for(let j in obs){
            //console.log(obs[j])
            let photUrl = obs[j].photoURL
            let location = obs[j].location
            let time = obs[j].time
            observations.push([name, photo, photUrl, location, time, userNick])
        }
    }

    await this.setState({
        observations: observations
    })
}