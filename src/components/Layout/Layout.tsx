import React from "react";
import NavBar from "../NavBar/NavBar";

interface MyComponentProps {
  children: React.ReactNode;
}

export default function Layout({ children, ...otherProps }: MyComponentProps) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
