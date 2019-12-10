import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import InfoRounded from '@material-ui/icons/InfoRounded';
import Swal from 'sweetalert2'

import firebase from 'firebase/app'

export default function ObservationDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  const verifyHandler = (id, userId) => {
    handleClose()
    Swal.fire({
      title: 'Are you sure?',
      text: "You can delete accidentaly verified stuff from the approved page!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, verify it!'
    }).then((result) => {
      if (result.value) {
        firebase.database().ref().child('users').child(userId).child('observations').child(id).child('verified').set(true)
        Swal.fire(
          'Verified!',
          'Your file has been verified.',
          'success'
        )
      }
    })
  }

  const deleteHandler = (id, userId) => {
    handleClose()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        firebase.database().ref().child('users').child(userId).child('observations').child(id).remove()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <img alt={'scorelab.org'} style={{width: "100%",height: 300}} src={props.img}/> 
        <List>
            {props.result.map(item => (
            <ListItem button onClick={() => handleListItemClick(item[1])} key={item[1]}>
                <ListItemAvatar>
                  <Avatar>
                    <InfoRounded/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item[1]} />
            </ListItem>
            ))}
        </List>
        <DialogTitle id="simple-dialog-title">
          {props.verified?
            <Button style={{margin: 2}} variant="outlined" onClick={()=>deleteHandler(props.id, props.userId)} color="secondary">Delete</Button>
          :
            <div>
              <Button style={{margin: 2}} variant="outlined" onClick={()=>verifyHandler(props.id, props.userId)} color="primary">Verify</Button>
              <Button style={{margin: 2}} variant="outlined" onClick={()=>deleteHandler(props.id, props.userId)} color="secondary">Delete</Button>
            </div>
          }
          
          
        </DialogTitle>
    </Dialog>
  );
}

ObservationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};