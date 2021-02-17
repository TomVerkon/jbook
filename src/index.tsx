import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import bundler from './bundler';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const bundledOutput = await bundler(input);
    console.log(bundledOutput);
    setCode(bundledOutput);
  };

  return (
    <div>
      <CodeEditor initialValue="" onChange={(value) => setInput(value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);
