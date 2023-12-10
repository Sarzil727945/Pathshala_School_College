'use client'
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import styles from './style.css';
import Swal from "sweetalert2";

const ExcelSheet = () => {
  const [data, setData] = useState([]);
  const [excelSheet, setExcelSheet] = useState([]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  }

  const newArray = []
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const name = `${element["First Name"]} ${element["Last Name"]} `

    const arrObj = { id: element.Id, name: name, gender: element.Gender, country: element.Country, age: element.Age, date: element.Date }

    newArray.push(arrObj);
  }

  useEffect(() => {
    getExcelSheet();
  }, []);

  const getExcelSheet = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/getExcelSheet`;
    const response = await fetch(url);
    const data = await response.json();
    setExcelSheet(data);
  };


  const dataPost = () => {
    for (let index = 0; index < newArray.length; index++) {
      const updateValue = newArray[index];

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/createExcelSheet`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updateValue)
      })
        .then(Response => Response.json())
        .then(data => {
          console.log(data)

          if (data?.affectedRows) {
            Swal.fire({
              title: 'Success!',
              text: 'admin page list edit Successful !!',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            getExcelSheet();
          }
        })
    }

  }

console.log(excelSheet);


  return (
    <div className="App">

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />

      <button onClick={() => dataPost()}>Save Data</button>

      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>

              <th>Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Country</th>
              <th>Age</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {newArray.map((value, index) => (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.gender}</td>
                <td>{value.country}</td>
                <td>{value.age}</td>
                <td>{value.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelSheet;