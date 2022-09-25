/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ReseivedMessages from '../ui/reseivedMessages';
import UsersList from '../ui/userPage';

function MainPage({ onChangeAuth, userEmailValue }) {
  const [userslist, setUsersList] = React.useState();
  let arrayOfUsers;
  let idOfUsers;
  let currentUserId;
  React.useEffect(() => {
    handleRequest();
  }, []);

  const handleUpdateUsers = () => {
    handleRequest();
  };
  const handleRequest = () => {
    fetch('https://task5-4489d-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .then((response) => response.json())
      .then((json) => setUsersList(json));
  };
  if (userslist) {
    const indexCurrentUser = Object.values(userslist).findIndex(
      (item) => item.userName === userEmailValue,
    );
    arrayOfUsers = Object.values(userslist);
    arrayOfUsers.splice(indexCurrentUser, 1);
    idOfUsers = Object.keys(userslist);
    currentUserId = idOfUsers.splice(indexCurrentUser, 1);
  }
  return (
    <>
      {userslist && (
        <div>
          <div className="text-primary m-3">
            Email авторизованного пользователя: {userEmailValue}
          </div>
          <div className="d-flex">
            <div className="m-3 ">
              {idOfUsers && (
                <UsersList
                  userEmailValue={userEmailValue}
                  onChangeAuth={onChangeAuth}
                  userslist={userslist}
                  onUpdate={handleUpdateUsers}
                  arrayOfUsers={arrayOfUsers}
                  idOfUsers={idOfUsers}
                />
              )}
            </div>
            <div className="d-flex" style={{ height: 'auto' }}>
              <div className="vr"></div>
            </div>
            {idOfUsers && (
              <div className="m-3 ms-4">
                <h3 className="fw-bolder mb-4">Ваши сообщения</h3>
                <ReseivedMessages currentUserId={currentUserId} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;
