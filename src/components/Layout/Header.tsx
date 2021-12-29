import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './styles';
import { LOGOUT } from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import  { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@material-ui/core';



export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const profile = localStorage.getItem('profile') || '{}';
    const [user, setUser] = useState(JSON.parse(profile));
  const logout =() => {
    console.log('logout');
     dispatch({ type: LOGOUT});
    setUser(null);
  }
useEffect(() =>{
  const token = user?.token;

  if (token) {
    const decodedToken = decode<any>(token);

  if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  }
  setUser(JSON.parse(profile));
}, [location]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Link to="/" className={classes.linkColor}>React Redux TypeScript - Material</Link>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          {user?.result ? 
            <Button color="inherit"><Link to="/user/create"><span className={classes.linkColor}>Create User</span></Link></Button>
            : <></>
          }
            </Typography>
          {user?.result ? 
          <>
          <Avatar className={classes.linkColor} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
          <Typography className={classes.linkColor} variant="h6">{user?.result.name}</Typography>
          <Button onClick={logout} color="inherit"><span className={classes.linkColor}>LogOut</span></Button>
          
          </> :
           <>
          <Button color="inherit"><Link to="/login" ><span className={classes.linkColor}>Login</span></Link></Button>
          <Button color="inherit"><Link to="/register"><span className={classes.linkColor}>Register</span></Link></Button>
          </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}