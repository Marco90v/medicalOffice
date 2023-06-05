import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import MyContext from "./context";

function App() {

  return (
    <MyContext>
      <RouterProvider
        router={router}
        fallbackElement={<span>cargando....</span>}
      />
    </MyContext>
  );
}

export default App;
