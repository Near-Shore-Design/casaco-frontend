import Footer from "components/molecules/Footer";
import Navbar from "components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "utilities/routes";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="">
        <Routing />
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
