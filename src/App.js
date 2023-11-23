import React, { useEffect, useState } from "react";
import Axios from "axios"; //npm i axios
import Dropdown from "react-dropdown"; // npm i react-dropdown
import { HiSwitchHorizontal } from "react-icons/hi"; // npm install react-icons
import "react-dropdown/style.css";
import "./App.css";

const App = () => {
  // Initializing all the state variables
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("eur");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.get(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
    ).then((cur) => {
      console.log("currency list", Object.keys(cur.data), cur.data);
      setOptions(Object.keys(cur.data));
    });
  }, []);

  useEffect(() => {
    handleConvert();
  }, [from, to]);

  // Function to convert the currency
  const handleConvert = () => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`
    ).then((res) => {
      console.log(res.data[to]);
      var rate = res.data[to];
      setOutput(input * rate);
    });
  };

  // Function to switch between two currency
  const handleFlip = () => {
    var temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="App">
      <div className="heading">
        <h1>Currency converter</h1>
      </div>
      <div className="container">
        <div className="middle">
          <h3>Source Currency</h3>
          <Dropdown
            options={options}
            onChange={(e) => {
              setFrom(e.value);
            }}
            value={from}
            placeholder="From"
          />
        </div>
        <div className="switch">
          <HiSwitchHorizontal size="30px" onClick={handleFlip} />
        </div>
        <div className="right">
          <h3>Target Currency</h3>
          <Dropdown
            options={options}
            onChange={(e) => {
              setTo(e.value);
            }}
            value={to}
            placeholder="To"
          />
        </div>
      </div>
      <div className="center">
        <center>
          <h3>Amount</h3>
        </center>
        <input
          type="text"
          placeholder="Enter the amount"
          onChange={(e) => {
            setInput(e.target.value);
            if (!e.target.value) {
              setOutput(0);
            }
          }}
        />
      </div>
      <div className="center">
        <center>
          <button onClick={handleConvert}>Convert</button>
        </center>
        {output !== 0 ? <h2>Converted Amount:</h2> : null}
        <p>
          {output !== 0
            ? input + " " + from + " = " + output.toFixed(2) + " " + to
            : null}
        </p>
      </div>
    </div>
  );
};

export default App;
