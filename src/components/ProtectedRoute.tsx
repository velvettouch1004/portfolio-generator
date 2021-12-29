import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'
import { LOGOUT } from '../constants/actionTypes';
import decode from 'jwt-decode';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    const profile = localStorage.getItem('profile')!;
    const [user, setUser] = useState(JSON.parse(profile));
    const location = useLocation(); 
    const dispatch = useDispatch();
    const logout = () => {
      dispatch({ type: LOGOUT });

      //history.push('/');

      setUser(null);
  };

  useEffect(() => {
      const token = user?.token;

      if (token) {
          const decodedToken = decode<any>(token);

          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }

      setUser(JSON.parse(profile));
  }, [location]);

  return (
    <Route
    {...rest}
    render={props =>
      user?.result ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
  )
}
export default ProtectedRoute;