import React from "react";
import { Logo } from "@aleph-front/core";

const Header: React.FC = () => {
  return (
    <header className="flex flex-row items-center w-full text-center px-16 pt-6">
      <Logo text="Node Metrics" size="30" />
    </header>
  );
};

export default Header;
