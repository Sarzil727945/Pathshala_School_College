'use client'
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import styles from './style.css';
import Swal from "sweetalert2";
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from "react-to-print";
import toast from 'react-hot-toast';


const ExcelSheet = () => {
  const [data, setData] = useState([]);
  const [excelSheet, setExcelSheet] = useState([]);
  const notifyS = (text) => toast.success(text);

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
    const name = element?.Name || `${element["First Name"]} ${element["Last Name"]} `
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

  const tableRef = useRef();
  const handleExportToPDF = () => {
    const input = tableRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('table.pdf');
    });
  };


  // url to pdf 
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    notifyS('Please Waiting URL To PDF Convert Running..');
    try {
      const response = await fetch('http://localhost:5002/convertToPDF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);
        window.open(pdfUrl, '_blank');
        console.log('okkk');
      } else {
        console.error('Failed to convert to PDF:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // const [url, setUrl] = useState('');

  const handleSubmitDownload = async (e) => {
    e.preventDefault();

    console.log('Submitting URL:', url);

    try {
      const response = await fetch('http://localhost:5002/convertToPDF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const blob = await response.blob();
        console.log('Received Blob:', blob);

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'converted.pdf';
        link.click();

        console.log('PDF downloaded');
      } else {
        console.error('Failed to convert to PDF:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  // pdf 2
  const conponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "pdfDownloadSA",
    // onAfterPrint: () => alert("Data saved in PDF")
  });




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



  return (
    <div className="App">

      <div>
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

      {/* download ExcelSheet part start  */}
      <div className="container mt-5 pt-5">
        <h3 className="mt-3 text-success"><center>Export React Table Data into EXCEL Sheet and PDF form</center></h3>
        <div className="row mt-4">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-success mb-3"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Export Data to Excel Sheet" />
          <button className="btn btn-success mb-3 ml-5"
            onClick={generatePDF} >
            Export Data to PDF and Print
          </button>

          <button className="btn btn-success mb-3 ml-5"
            onClick={handleExportToPDF} >
            Export Data to PDF
          </button>

          <form onSubmit={handleSubmit}>
            <label>
              URL:
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            </label>
            <button className="btn btn-success mb-2" type="submit">
              URL Convert to PDF
            </button>
          </form>

          <form onSubmit={handleSubmitDownload}>
            <button className="btn btn-success mb-2 ml-3" type="submit">
              URL Convert to PDF Download
            </button>
          </form>

          <div ref={conponentPDF} style={{ width: '100%' }}>
            <table className="table" id="table-to-xls"
              ref={tableRef}
            >
              <thead className="thead-dark">
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

                {excelSheet.map((value, index) => (
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
          </div>
        </div>
      </div>
      {/* download ExcelSheet part ends */}

      {/* download pdf part start */}
      {/* <div className="container mt-5 pt-5">
        <h3 className="mt-3 text-success">
          <center>Export React Table Data into PDF</center>
        </h3>
        <div className="row mt-4">
          <button className="btn btn-success mb-3" onClick={handleExportToPDF}>
            Export Data to PDF
          </button>
          <table className="table" ref={tableRef}>
            <thead className="thead-dark">
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
              {excelSheet.map((value, index) => (
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
        </div>
      </div> */}
      {/* download pdf part ends */}
    </div>
  );
};

export default ExcelSheet;