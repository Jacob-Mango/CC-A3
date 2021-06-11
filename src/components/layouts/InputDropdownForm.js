import React from "react";

const InputDropdownForm = ({ style, name, header, options, onChange }) => {
  return (
    <div className='input-container' style={style}>
      <span className='header' htmlFor={name}>
        {header}
      </span>
      <select className='input' id={name} name={name} onChange={onChange}>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputDropdownForm;
