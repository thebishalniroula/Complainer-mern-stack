import { ReactNode } from "react";
import { useAppDispatch } from "../../store/hooks";
import { resetNavProfileModel } from "../../features/counter/modelsSlice";
const AppContainer = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  return (
    <main
      onClick={(e) => {
        dispatch(resetNavProfileModel());
      }}
    >
      {children}
    </main>
  );
};

export default AppContainer;
