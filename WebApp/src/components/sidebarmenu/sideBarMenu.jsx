import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import * as Icon from 'react-feather';


class SideBarMenu extends Component {

    sidebarLinks() {
        // if (this.props.authenticated) {
        //   return [
        //     <li><Link to="/secret">Secret</Link></li>,
        //     <li><Link to="/signout">Sign out</Link></li>
        //   ];
        // }
        return [
            <li><Link to="/addprodu">Add Product</Link></li>,
            <li><Link to="">Manage Products</Link></li>,
            <li><Link to="">Statistics</Link></li>,
            <li><Link to="">Software Overview</Link></li>,
            <li><Link to="">Support</Link></li>,
            
        ];
      }

    render(){
        return (
            <div className="sidebarMenu">
            <List component="nav">
              
                <ListItem button component="a" href="/">
                  <ListItemIcon>
                  <Icon.Home/>
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>

                <ListItem button component="a" href="/manageProducts">
                  <ListItemIcon>
                  <Icon.Box/>
                  </ListItemIcon>
                  
                    <ListItemText primary="Manage Products" />
                </ListItem>

                <ListItem button component="a" href="/statistics">
                  <ListItemIcon>
                  <Icon.Activity/>
                  </ListItemIcon>
                  <ListItemText primary="Statistics" />
                </ListItem>

                <ListItem button component="a" href="/overview">
                  <ListItemIcon>
                  <Icon.Server/>
                  </ListItemIcon>
                    <ListItemText primary="Software Overview" />
                </ListItem>

                <ListItem button  component="a" href="/support">
                  <ListItemIcon>
                  <Icon.Users/>
                  </ListItemIcon>
                  <ListItemText primary="Support" />
                </ListItem>

              </List>
          </div>
            
        );
    }
}

export default SideBarMenu