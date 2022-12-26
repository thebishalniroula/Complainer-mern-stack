import React, { ReactNode } from "react";
import Nav from "./Nav";
type props = {
  children: ReactNode;
};
const Layout = ({ children }: props) => {
  return (
    <>
      <Nav />
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;
