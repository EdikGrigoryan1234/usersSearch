import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [timerId, setTimerId] = useState();
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      
		.then((res) =>
        setTimerId(() => {
          setTimeout(() => {
            clearTimeout(timerId);
            setData(
              res.users.filter((e) =>
                e.firstName
                  .trim()
                  .toLowerCase()
                  .startsWith(text.trim().toLowerCase())
              )
            );
          }, 1000);
        })
      );
  }, [text]);
  return (
    <div className="App">
      <input type="text" onChange={(evt) => setText(evt.target.value)} />
      <div className="cards">
        {data.map((e) => {
          return (
            <>
              <div className="card">
                <img src={e.image} />
                <h3>{e.firstName}</h3>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
