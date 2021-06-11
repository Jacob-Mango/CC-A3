import React from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const InputForm = ({ style, name, type, header, onChange, def }) => {
  if (type === "date") {
    return (
      <div className='input-container' style={style}>
        <span className='header' htmlFor={name}>
          {header}
        </span>
        <DatePicker selected={def} name={name} id={name} onChange={onChange} />
      </div>
    );
  }

  return (
    <div className='input-container' style={style}>
      <span className='header' htmlFor={name}>
        {header}
      </span>
      <input
        onChange={onChange}
        className='input'
        id={name}
        type={type}
        name={name}
      />
    </div>
  );
};

export default InputForm;
