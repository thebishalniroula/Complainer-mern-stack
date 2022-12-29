import type { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import Navbar from "../navbar/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <main className="appContainer">
        <Sidebar />
        <Navbar />
        <div className="app">{children}</div>
      </main>
    </Provider>
  );
};

export default Layout;
