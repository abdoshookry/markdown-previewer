import "./App.css";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import { useLocalstorage } from "./hooks/useLocalstorage";
import response from "./data/docs.json";

const App = () => {
  const [code, setCode] = useLocalstorage("MarkDown");

  // console.log(tt);
  // const [code, setCode] = useState("## Hello");
  const [compiled, setCompiled] = useState(marked.parse(code));
  const [tab, setTab] = useState("MarkDown");
  const docs = response.basic_syntax;

  const changeTabs = (tab) => {
    setTab(tab);
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  return (
    <>
      <h1 className="header">MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={() => changeTabs("MarkDown")} className="btn1">
            MarkDown
          </button>
          <button onClick={() => changeTabs("Preview")} className="btn2">
            Preview
          </button>
          <button onClick={() => changeTabs("Docs")} className="btn3">
            Docs
          </button>
        </div>
        {tab === "MarkDown" ? (
          <div>
            <textarea className="text" onChange={handleChange} value={code} />
          </div>
        ) : tab === "Preview" ? (
          <div>
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: compiled }}
            ></div>
          </div>
        ) : tab === "Docs" ? (
          <div>
            <div className="text">
              {docs.map((concept) => {
                return (
                  <div className="concept">
                    {" "}
                    <h2>{concept.name}</h2>
                    <p className="concept-desc">{concept.description}</p>
                    {concept.examples.map((example, index) => {
                      return (
                        <div className="example">
                          <h3 className="example-name">example {index + 1}</h3>
                          <h4>- html</h4>
                          <p>{example.html}</p>
                          <h4>- markdown</h4>
                          <p>{example.markdown}</p>
                        </div>
                      );
                    })}
                    {concept.additional_examples.map((additional_example) => {
                      return (
                        <div className="example">
                          <h3>{additional_example.name}</h3>
                          <p>{additional_example.description}</p>
                          <h4>- html</h4>
                          <p>{additional_example.html}</p>
                          <h4>- markdown</h4>
                          <p>{additional_example.markdown}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>invalid tab</div>
        )}
      </div>
    </>
  );
};

export default App;
