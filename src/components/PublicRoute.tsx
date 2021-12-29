import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom'
import decode from 'jwt-decode';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {

    const profile = localStorage.getItem('profile')!;
    const [user, setUser] = useState(JSON.parse(profile));
    const location = useLocation();

  useEffect(() => {
      const token = user?.token;

      if (token) {
          const decodedToken = decode<any>(token);
      }

      setUser(JSON.parse(profile));
  }, [location]);

  return (
    <Route {...rest} render={props => {
      if (localStorage.getItem('profile')) {
        // setExistingUserOnLogRocket();
        return <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />;
      }
      return <Component {...props} />;
      }
    }
    />
  )
}
export default ProtectedRoute;





