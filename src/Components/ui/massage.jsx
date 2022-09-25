import React from 'react';

function Massage({ sender, topic, sendingTime, massage }) {
  const [massageCondition, setMassageCondition] = React.useState(false);

  const handleToggleCondition = () => {
    setMassageCondition(!massageCondition);
  };
  return (
    <>
      <div>
        <div>
          <div className="d-flex align-items-center">
            <h5 className="me-4 mt-3">Получено от {sender}</h5>
            <span className="mt-2 text-secondary opacity-50">{sendingTime}</span>
          </div>

          <div
            className="fw-semibold mb-3 "
            style={{ cursor: 'pointer' }}
            onClick={handleToggleCondition}>
            {topic}
            {massageCondition ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-down-fill  ms-2"
                viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-up-fill ms-2"
                viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
            )}
          </div>
        </div>

        {massageCondition && (
          <div style={{ width: '300px' }}>
            <p className="mb-3" style={{ overflowWrap: 'anywhere' }}>
              {massage}
            </p>
          </div>
        )}

        <div
          className="d-flex bg-secondary"
          style={{ height: '1px', width: '100% ', opacity: '0.4' }}></div>
      </div>
    </>
  );
}

export default Massage;
