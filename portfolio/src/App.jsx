import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Portfolio from "./pages/Portfolio/Portfolio";

function App() {
  return (
    <BrowserRouter>
      {/* <AppRoutes /> */}
      <Portfolio />
    </BrowserRouter>
  );
}

export default App;
