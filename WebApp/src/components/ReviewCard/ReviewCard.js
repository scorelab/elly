import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ObservationDialog from '../ObservationDialog/ObservationDialog'
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    margin: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    width: 300
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const emails = ['username@gmail.com', 'user02@gmail.com'];
export default function ReviewCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={props.userPhoto}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.user}
        subheader={props.time}
      />
      <CardMedia
        className={classes.media}
        image={props.obPhoto}
        title={props.user}
      />
      <CardContent>
        <Button onClick={handleClickOpen} variant="outlined" color="primary">View</Button>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
      <ObservationDialog verified={props.verified} userId={props.userId} id={props.id} img={props.obPhoto} result={props.result} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </Card>
  );
}