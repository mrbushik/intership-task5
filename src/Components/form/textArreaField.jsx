import React from 'react';

function TextArreaField({ type, name, value, onChange }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-1">
      <div className="input-group has-validation">
        <textarea
          type={'text'}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={'form-control'}></textarea>
      </div>
    </div>
  );
}

export default TextArreaField;
