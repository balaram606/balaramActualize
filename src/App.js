import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../src/App.css';


function App() {

  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = ((error) => {
        reject(error);
      });
    });

    promise.then((d) => {
      setItems(d)
      console.log(d);
    })
  }
  return <>
   <div className='fileinput'> <input className='fileinput' type='file'
      onChange={(e) => {
        const file = e.target.files[0];
        readExcel(file);
      }} /></div>



    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Child Part Number</th>
          <th scope="col">Child Part Description</th>
          <th scope="col">Item Reference Number</th>
          <th scope="col">Quantity Production</th>
        </tr>
      </thead>
      <tbody>
      {items.map((d, index) => (
            <tr key={index}>
              <td>{d['Child Part Number']}</td>
              <td>{d['Child Part Description']}</td>
              <td>{d['item reference number']}</td>
              <td>{d['quantity production']}</td>
            </tr>
          ))}

      </tbody>
    </table>
  </>
}

export default App;

