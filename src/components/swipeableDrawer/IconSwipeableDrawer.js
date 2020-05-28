import React, { Component } from 'react'
import Drawer from 'react-motion-drawer';
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { RiLogoutCircleLine } from 'react-icons/ri';

class IconSwipeableDrawer extends Component {
  state = {
    openLeft: false,
    drawerStyle: `
{
  "background": "#F9F9F9",
  "boxShadow": "rgba(0, 0, 0, 0.188235) 0px 10px 20px, 
  rgba(0, 0, 0, 0.227451) 0px 6px 6px"
}`,
    relativeWidth: false,
    width: "60%",
    noTouchOpen: false,
    noTouchClose: false,
  };

  setWidth = e => {
    this.setState({
      width: Number(e.target.value) || e.target.value
    });
  };

  setTouch = e => {
    this.setState({
      [e.target.name]: !e.target.checked
    })
  }

  setDrawerStyle = e => {
    e.preventDefault()
    this.setState({
      drawerStyle: this.drawerStyleRef.value
    })
  }

  render() {
    const {
      drawerStyle: 
        stringDrawerStyle,
        openLeft,
        noTouchOpen,
        noTouchClose
    } = this.state;

    const drawerProps = {
      overlayColor: "rgba(255,255,255,0.6)"
    };

    const styleButton = {
      backgroundColor:'#E8DA10',
      width:'100%'

  }
    return (
      <div>
        <div>
          <MenuIcon fontSize="large"  onClick={() => this.setState({ openLeft: !openLeft })} style={{marginTop:'20%', marginRight :'0%'}}/>
        </div>

        {
          <Drawer
            {...drawerProps}
            width={this.state.width}
            fadeOut
            open={openLeft}
            onChange={open => this.setState({ openLeft: open })}
            noTouchOpen={noTouchOpen}
            noTouchClose={noTouchClose}
          >
            {val => {
              var per = val / 150;
              return (
              /*  <div style={{ backgroundColor: `rgba(255,249,167, ${per})`,
                  width: "100%",
                  height: "100%"
                  }} >
                
                <div>
                  <Button onClick={() => this.props.onLogout()} style={styleButton}>Logout</Button> 
                </div>
                <Divider />
                <div>
                  <Button onClick={() => this.props.onLogout()} style={styleButton}>Logout</Button>
                </div>
                </div> */

                <div style={{ backgroundColor: `rgba(255,249,167, ${per})`,
                width: "100%",
                height: "100%"
                }} >
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
         
          
        >
          <ListItemText primary="PROFILE" />
        </ListItem>
      </List>

      <Divider />
     
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          onClick={() => this.props.onLogout()}

        >
        <RiLogoutCircleLine   size="30px" />
          <ListItemText primary="LOGOUT" />
        </ListItem>
      </List>
    </div>

            
              );
            }}
          </Drawer>}


            
         
       

      </div>
    );
  }
}

export default IconSwipeableDrawer