import { ThemeProvider } from "./theme-context/theme-context"
import { GlobalStyle } from "./components/globalStyle/globalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonDetail from "./pages/pokemonDetail";
import Home from "./pages/Home";

function App() {
  
  return (
    <ThemeProvider>
       <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
       
  );
}

export default App
