import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserInfoBox from "./pages/users/Users";
import Posts from "./pages/posts/Posts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<UserInfoBox />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
