import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {

  return (
    <RouterProvider
      router={router}
      fallbackElement={<span>cargando....</span>}
    />
  );
}

export default App;
