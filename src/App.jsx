import { useState, useEffect } from "react";
import "./App.css";
import { MdFavoriteBorder } from "react-icons/md";
export default function App() {
  const [Advice, setAdvice] = useState("Don't be rude");
  const [toggleAdvice, setToggleAdvice] = useState(false);

  //fetches the favorite Advice from Local Storage
  const [savefavouriteAdvice, setSaveFavouriteAdvice] = useState(() => {
    const storedData = localStorage.getItem("FavouriteAdvice");
    return storedData ? JSON.parse(storedData) : [];
  });

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    console.log(data.slip.advice);
  }

  //sets favourite advice whenever the setfavouriteAdvice variable changes its value

  useEffect(() => {
    localStorage.setItem(
      "FavouriteAdvice",
      JSON.stringify(savefavouriteAdvice)
    );
  }, [savefavouriteAdvice]);

  const toggleAdviceState = () => {
    setToggleAdvice(!toggleAdvice);
  };
  const handleSaveFavouriteAdvice = (advice) => {
    setSaveFavouriteAdvice((prevAdvice) => [...prevAdvice, advice]);
  };

  const repeat = (length, symbol) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += symbol;
    }
    return result;
  };

  return (
    <div className="center">
      <h1>Hello World</h1>
      <button onClick={getAdvice}>Get New advice</button>
      <button onClick={toggleAdviceState}>toggleAdvice</button>
      <p>{toggleAdvice ? repeat(Advice.length, "*") : Advice}</p>
      <button
        onClick={() => handleSaveFavouriteAdvice(Advice)}
        title="Save Advice"
      >
        <MdFavoriteBorder />
      </button>
      <h2>Favourite Advice</h2>
      <ul>
        {savefavouriteAdvice.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
