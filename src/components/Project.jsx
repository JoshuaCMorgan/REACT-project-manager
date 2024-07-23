import React from "react";
export function Project({ title, description, date }) {
  return (
    <div className="viewProjectContainer">
      <h2 className="title">{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  );
}
