import React from 'react';
import './App.css';
import { Button } from 'antd';

const rows = [
  ["HhiUFcyvbmJJrNuveVBwEsqGfotsSEb1KRLVuB9dUn4GiuE", "kton", "18.2", "kusama"],
  ["HhiUFcyvbmJJrNuveVBwEsqGfotsSEb1KRLVuB9dUn4GiuE", "kton", "18.2", "kusama"],
  ["HhiUFcyvbmJJrNuveVBwEsqGfotsSEb1KRLVuB9dUn4GiuE", "kton", "18.2", "kusama"],
  ["HhiUFcyvbmJJrNuveVBwEsqGfotsSEb1KRLVuB9dUn4GiuE", "kton", "18.2", "kusama"],
] as string[][];

const downloadData = (data: string, filename = 'transferx.csv', type = 'data:text/csv;charset=utf-8') => {
  const file = new Blob(["\ufeff" + data], { type: type });
  const url = URL.createObjectURL(file);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
};

function App() {
  const handleClick = () => {
    downloadData(rows.map(e => e.join(",")).join("\n"));
  }

  return (
    <>
      <Button onClick={handleClick}>I am antd Button</Button>
    </>
  );
}

export default App;
