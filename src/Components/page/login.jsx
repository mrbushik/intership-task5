/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../ui/loginForm';

function Login({ ...rest }) {
  const [userslist, setUsersList] = React.useState();
  React.useEffect(() => {
    fetch('https://task5-4489d-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .then((response) => response.json())
      .then((json) => setUsersList(json));
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <h3 className="mb-4">Login</h3>
            <LoginForm {...rest} usersList={userslist} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
