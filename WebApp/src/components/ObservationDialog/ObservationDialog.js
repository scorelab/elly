import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Swal from 'sweetalert2'
import firebase from 'firebase/app'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const verifyHandler = (id, userId) => {
    console.log(id)
    props.onClose()
    Swal.fire({
      title: 'Are you sure?',
      text: "You can reject accidentaly verified stuff from the approved page!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, verify it!'
    }).then((result) => {
      if (result.value) {
        firebase.database().ref().child('usersObservations').child(id).child('verified').set('approved')
        props.parentCallback(0)
        Swal.fire(
          'Verified!',
          'Your file has been verified.',
          'success'
        )
      }
    })
  }

  const deleteHandler = (id, userId) => {
    props.onClose()
    console.log(id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.value) {
        firebase.database().ref().child('usersObservations').child(id).child('verified').set('rejected')
        props.parentCallback(0)
        Swal.fire(
          'Rejected!',
          'Your file has been rejected.',
          'success'
        )
      }
    })
  }

  const showPrev = () => {
    if(props.index>0){
      props.parentCallback(props.index-1)
    }
    
  }

  const showNext = () => {
    console.log(props.index, props.max)
    if(props.index<props.max-1){
      props.parentCallback(props.index+1)
    }
    
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <div style={{flexDirection: 'row'}}>
              <Avatar aria-label="recipe" src={props.userPhoto}/>
              <div style={{flexDirection: 'column'}}>
                <h2 id="transition-modal-title">{props.user}</h2>
                <p id="transition-modal-description">{props.time}</p>
              </div>
              
            </div>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                <Avatar style={{margin: 10, width: 70, height: 70}} onClick={showPrev}>
                  <ArrowBackIos/>
                </Avatar>
              <img alt={'scorelab.org'} style={{width: 700,height: 500, margin: 10, display: 'inline-block', pointerEvents: 'none'}} src={props.img}/> 
              <List style={{display: 'inline-block',margin: 10}}>
                  {props.result.map(item => (
                  <ListItem button key={item[1]}>
                      {/* <ListItemAvatar>
                        <Avatar>
                          <InfoRounded/>
                        </Avatar>
                      </ListItemAvatar> */}
                      <ListItemText primary={item[1]} />
                  </ListItem>
                  ))}
              </List>
              <Avatar style={{margin: 10, width: 70, height: 70}}  onClick={showNext}>
                <ArrowForwardIosIcon/>
              </Avatar>
              
            </div>
           
            {props.verified==='approved'?
              <Button style={{margin: 2}} variant="outlined" onClick={()=>deleteHandler(props.id, props.userId)} color="secondary">Reject</Button>
            :
              <div>
                <Button style={{margin: 2}} variant="outlined" onClick={()=>verifyHandler(props.id, props.userId)} color="primary">Verify</Button>
                <Button style={{margin: 2}} variant="outlined" onClick={()=>deleteHandler(props.id, props.userId)} color="secondary">Reject</Button>
              </div>
            }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}