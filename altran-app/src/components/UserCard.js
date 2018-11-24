import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  card: {
    maxWidth: 400,
    minWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class UserCard extends React.Component {
  state = { expanded: false, workExpanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleExpandClickWork = () => {
    this.setState(state => ({ workExpanded: !state.workExpanded }));
  };

  onClose = () => {
      if (this.props.onClose)
        this.props.onClose();
  }

  render() {
    const { classes, item } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {item.name[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={this.onClose}>
              <CloseIcon />
            </IconButton>
          }
          title={item.name}
          subheader={"Age: " + item.age}
        />
        <CardMedia
          className={classes.media}
          image={item.thumbnail}
          title={item.name}
        />
        <CardContent>
        <Typography component="p">Weight: {item.weight}</Typography>
        <Typography component="p">Height: {item.height}</Typography>
        <Typography component="p">Hair Color: {item.hair_color}</Typography>
        </CardContent>
      
      
        <CardActions className={classes.actions} disableActionSpacing>

        <Typography component="p">Friends</Typography>

          <IconButton className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{item.friends.join(", ")}</Typography>
          </CardContent>
        </Collapse>

         <CardActions className={classes.actions} disableActionSpacing>

            <Typography component="p">Professions</Typography>

            <IconButton className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.workExpanded,
                })}
                onClick={this.handleExpandClickWork}
                aria-expanded={this.state.workExpanded}
                aria-label="Show more"
            >
                <ExpandMoreIcon />
            </IconButton>
            </CardActions>

         <Collapse in={this.state.workExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{item.professions.join(", ")}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);