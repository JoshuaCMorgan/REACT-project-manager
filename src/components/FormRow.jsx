import React from "react";
export function FormRow({ type, name, labelText, textarea, ...props }) {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      {textarea ? (
        <textarea className="form-input" name={name} id={name}></textarea>
      ) : (
        <input
          className="form-input"
          type={type}
          name={name}
          id={name}
          {...props}
        />
      )}
    </div>
  );
}
