import React, { Component } from 'react'
import Drawer from 'react-motion-drawer';
import MenuIcon from '@material-ui/icons/Menu'
import logo from '../../image/logo2.png'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { RiLogoutCircleLine } from 'react-icons/ri';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom"
import ListIcon from '@material-ui/icons/List';
import WorkIcon from '@material-ui/icons/Work';
import Loadable from 'react-loadable'
import LazyLoad from 'react-lazyload'

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
    width: "50%",
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
      overlayColor: "rgba(108,117,125,0.6)",
      maxWidth:'300px'
    };

    const styleButton = {
      backgroundColor:'#E8DA10'
  }

    return (
      <div>
        <div>
          <MenuIcon fontSize="large"  onClick={() => this.setState({ openLeft: !openLeft })}/>
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
              <div style={{ 
                      backgroundColor: `rgba(255,255,255, ${per})`,
                      width: "100%",
                      height: "100%",
                      position:'relative'
                    }} >

                    <List component="nav" aria-label="main mailbox folders" >
                      <div style={{width:'100%'}}>
                      
                          <img alt="logo" src={logo} style={{width:'50%', marginLeft:'auto', marginRight:'auto', display: "block", paddingBottom:'10px'}} />
                  
                      </div>


                      <Link className="text-muted" to="/profile" >
                        <ListItem button>
                          <ListItemText>
                            <p style={{fontSize:'4vw'}}> <PersonIcon style={{ fontSize: '4vw' }} /> Profile</p>
                          </ListItemText>
                        </ListItem>
                      </Link>

                      <Link className="text-muted" to="/" >
                        <ListItem button>
                          <ListItemText>
                            <p style={{fontSize:'4vw'}}> <WorkIcon style={{ fontSize: '4vw' }} /> Maintenance Job</p>
                          </ListItemText>
                        </ListItem>
                      </Link>
      
                      <Link className="text-muted" to="/maintenance" >
                        <ListItem button>
                          <ListItemText>
                            <p style={{fontSize:'4vw'}}> <ListIcon style={{ fontSize: '4vw' }} /> Maintenance List</p>
                          </ListItemText>
                        </ListItem>
                      </Link>
                    </List>



                  <List className="text-muted"  style={{position:'absolute', left:'0', bottom:'0', width:'100%'}} component="nav" aria-label="main mailbox folders">
                    <ListItem button onClick={() => this.props.onLogout()} >
                      <ListItemText>
                        <p style={{fontSize:'4vw'}}> <RiLogoutCircleLine style={{ fontSize: '4vw' }} /> Logout</p>
                      </ListItemText>
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