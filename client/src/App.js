import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../src/components/style/GlobalStyle";
import Search from "./components/views/SearchPage/index";
import ReviewWritingPage from "./components/views/ReviewPage/ReviewWriting";
import PathList from "./components/views/PathListPage/PathList"; 
import Shuttle from "./components/views/ShuttlePage/Shuttle";
import Favorite from "./components/views/FavoritePage/Favorite";
import NavBar from "./components/views/NavBar/NavBar";  

function App() {
  return (
    <div className="App">
      <GlobalStyle /> 
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Search />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/review-write" element={<ReviewWritingPage />} />
          <Route exact path="/shuttle" element={<Shuttle />} />
          <Route exact path="/path-list" element={<PathList />} />
          <Route exact path="/favorite" element={<Favorite />} />
        </Routes>
        <NavBar /> 
      </BrowserRouter>
    </div>
  );
}
export default App;