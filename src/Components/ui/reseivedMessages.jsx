/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Massage from './massage';

function ReseivedMessages({ currentUserId }) {
  const [massageList, setUsersList] = React.useState();
  React.useEffect(() => {
    handleRequest();
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      handleRequest();
    }, 5000);
  }, []);

  const handleRequest = () => {
    fetch(
      `https://task5-4489d-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUserId}/massages.json`,
    )
      .then((response) => response.json())
      .then((json) => setUsersList(json));
  };

  return (
    <div>
      {massageList ? (
        Object.values(massageList)
          .reverse()
          .map((item, index) => (
            <Massage
              key={index}
              sender={item.sender}
              topic={item.topic}
              sendingTime={item.sendingTime}
              massage={item.massage}
            />
          ))
      ) : (
        <p className="text-secondary opacity-50">Список сообщений пуст</p>
      )}
    </div>
  );
}

export default ReseivedMessages;
