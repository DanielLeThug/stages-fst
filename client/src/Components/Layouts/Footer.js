import React from "react";

export default () => {
  return (
    <footer className="footer bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        Copyright &copy; {new Date().getFullYear()} Stages-FST
      </div>
    </footer>
  );
};
