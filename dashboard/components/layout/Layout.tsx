import type { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import Navbar from "../navbar/nav/Navbar";
import Main from "../main/App";
import AppContainer from "../appContainer/AppContainer";
import Models from "../ModelsWrapper/ModelsWrapper";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AppContainer>
        <Sidebar />
        <Navbar />
        <Main>{children}</Main>
      </AppContainer>
      <Models />
    </Provider>
  );
};

export default Layout;
