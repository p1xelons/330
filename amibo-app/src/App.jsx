import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { loadXHR } from "./ajax";
import { readFromLocalStorage, writeToLocalStorage } from "./storage";
import Header from "./Header";
import Footer from "./Footer";
import AmiiboList from "./AmiiboList";
import AmiiboSearchUI from "./AmiiboSearchUI";

// app "globals" and utils
const baseurl = "https://www.amiiboapi.org/api/amiibo/?name=";

const App = () => {
  // only read from localStorage once, when the component first mounts
  const savedTerm = useMemo(() => readFromLocalStorage("term") || "", []);
  const [term, setTerm] = useState(savedTerm);
  const [results, setResults] = useState([]);

  // save `term` whenever it changes
  useEffect(() => {
    writeToLocalStorage("term", term);
  }, [term]);

  const parseAmiiboResult = (xhr) => {
    // get the `.responseText` string
    const string = xhr.responseText;

    // declare a json variable
    let json;

    // try to parse the string into a json object
    try {
      json = JSON.parse(string);
    } catch (error) {
      console.log(`ERROR: ${error} with string: ${string}`);
      return;
    }

    // the API returns an `error` object (no `amiibo` array) when nothing matches
    setResults(Array.isArray(json.amiibo) ? json.amiibo : []);
  };

  const searchAmiibo = (name, callback) => {
    loadXHR(`${baseurl}${name}`, callback);
  };

  return (
    <>
      <Header title="Amiibo Finder" />
      <hr />
      <main>
        <AmiiboSearchUI
          term={term}
          setTerm={setTerm}
          searchAmiibo={searchAmiibo}
          parseAmiiboResult={parseAmiiboResult}
        />
        <AmiiboList results={results} />
      </main>
      <hr />
      <Footer name="Ace Coder" year={new Date().getFullYear()} />
    </>
  );
};

export default App;