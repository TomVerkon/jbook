import React, { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
  <head>
    <style>html { background-color: white; } </style>
  </head>
  <body>
    <div id='root'></div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err);
      }
      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      })
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // reset the iframe content before each submission in case
    // it was previously ruined by something like document.body.innerHHTML = ''
    // also setup a timer so that the post message happens after the srcdoc update
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="previewer"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && (
        <div className="preview-error">
          <h4>Runtime Error</h4>
          {err}
        </div>
      )}
    </div>
  );
};

export default Preview;
