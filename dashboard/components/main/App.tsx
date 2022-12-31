import React, { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";

const App = ({ children }: { children: ReactNode }) => {
  const isMaximized = useAppSelector((state) => state.sidebar.value);

  return (
    <div className={`app ${isMaximized ? "maximize" : "minimize"}`}>
      {children}
    </div>
  );
};

export default App;
