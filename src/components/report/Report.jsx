import React ,{ useRef,useContext }from 'react';
import './report.css';
import ReactToPrint from "react-to-print";
import {
    Button,
    DialogActions,
    CardActions
  } from "@material-ui/core";
  import { HiDownload } from "react-icons/hi";
import { BsPrinterFill } from "react-icons/bs";

export default function invoice({data}) {

    const componentRef = useRef();
    console.log(data);

  return (

    <>
    
    <div className="invoice-body">
      <div className="Invoice" ref={componentRef}>
        <div className="inv-header">
          <div>
            <h1>AROGYA MEDICALS</h1>
          </div>
          <div>
            <h3>Arogya Medicals .Ltd</h3>
            <p style={{ marginTop: 8 }}>
              Address: 123, Main Street, Colombo 01
            </p>
            <p style={{ marginTop: 8 }}>Phone: 011-1234567</p>
            <p style={{ marginTop: 8 }}>Email:arogyamedical@gmail.com</p>
          </div>
        </div>
        <div className="inv-details">
          <div>
            <h3 style={{ marginTop: 8 }}>Invoice To</h3>
            <p style={{ marginTop: 8 }}>Customer Name:{data.fullname} </p>
            <p style={{ marginTop: 8 }}>Age:{data.age}</p>
            <p style={{ marginTop: 8 }}>Blood Type:{data.blood}</p>
            <p style={{ marginTop: 8 }}>Speciment By: {data.specimenby}</p>
          </div>
        </div>
        <div className="inv-table" style={{ marginTop: 50 }}>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th className="th"></th>
                 <th className="th">Result</th>
                 <th className="th">Units</th>
                 <th className="th">REF.Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td">Testing Blood Glucose</td>
                  <td className="td">{data.result}</td>
                  <td className="td">mg/dl</td>
                  <td className="td">(70.0-115.0)</td>
                </tr>
            
              </tbody>
            </table>
          </div>
        </div>
        <div className="inv-sign">
          <div>
            <p style={{ marginTop: 5 }}>_________________</p>
            <p style={{ marginTop: 10 }}>Authorized Signature</p>
          </div>
          <div>
            <p style={{ marginTop: 15 }}>Thank you for your business!</p>
          </div>
        </div>
      </div>
                    <CardActions>
        <ReactToPrint
          trigger={() => (
            <Button color="primary">
              <BsPrinterFill /> Print Invoice
            </Button>
          )}
          content={() => componentRef.current}
          pageStyle="@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } .invoice-body { align-items: center; } }"
        />
      </CardActions>
      </div>
      
    </>
  );
}
