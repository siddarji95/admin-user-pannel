import React, { Component } from "react";
import { Route, Switch, withRouter, matchPath } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import RegisterPanel from "./components/authPanel/RegisterPanel";
import LoginPanel from "./components/authPanel/LoginPanel";
import Dashboard from "./components/dashboard/Dashboard";
import AddUsers from "./components/dashboard/AddUsers";
import ShowUsers from "./components/dashboard/ShowUsers";
import PrivateRoute from "./components/common/PrivateRoute";
import routes from "./routes";


import "./App.css";

const drawerWidth = 240;

const drawer = (
  <>
    <Toolbar />
    <Divider />
    <Navbar />
  </>
);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    console.log(this.props.location.pathname)
    const currentRoute = routes.find(
      route => matchPath(this.props.location.pathname, route)
    )
    console.log(currentRoute)
    return (
          <div className="App">
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <AppBar
                position="fixed"
                sx={{
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                  ml: { sm: `${drawerWidth}px` },
                }}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                   { currentRoute ? currentRoute.name: "Admin Panel" }
                  </Typography>
                </Toolbar>
              </AppBar>
              <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
              >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                  variant="temporary"
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                >
                  {drawer}
                </Drawer>
                <Drawer
                  variant="permanent"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                  open
                >
                  {drawer}
                </Drawer>
              </Box>
              <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
              >
                <Toolbar />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={RegisterPanel} />
                <Route exact path="/login" component={LoginPanel} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute exact path="/add_users" component={AddUsers} />
                  <PrivateRoute exact path="/show_users" component={ShowUsers} />
                </Switch>
              </Box>
            </Box>
          </div>
    );
  }
}

export default withRouter(App);
