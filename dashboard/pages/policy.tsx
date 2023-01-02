import TryModel from "../components/TryModel/TryModel";
import { useState } from "react";
const Policy = () => {
  const [model, setModel] = useState(false);
  return (
    <div>
      <h1 onClick={() => setModel(true)}>Policy</h1>
      {model && (
        <TryModel clickHandler={setModel}>
          <div>Hello world</div>
        </TryModel>
      )}
    </div>
  );
};

export default Policy;
