import React, { useRef,useContext } from "react";
import jsPDF from "jspdf";
import ReactToPrint from "react-to-print";
import "./invoice.css";
import html2canvas from "html2canvas";
import { HiDownload } from "react-icons/hi";
import { BsPrinterFill } from "react-icons/bs";
import { AuthContext } from '../../security/AuthProvider';
import {
  Button,
  DialogActions,
  CardActions
} from "@material-ui/core";

const Invoice = ({ data }) => {
  const { user } = useContext(AuthContext);
  const componentRef = useRef();
  console.log(data);


  const currentDate = new Date().toISOString().slice(0, 10);

  if (!user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.2rem' }}>
        <div className="loderarea">
            <p className="Hedding">You must be logged in to view this page.</p></div>
            {navigate('/')};
        </div>
    );
  }else {
  return (
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
            <p style={{ marginTop: 8 }}>Address:{data.Address} </p>
            <p style={{ marginTop: 8 }}>Phone:{data.Mobile}</p>
            <p style={{ marginTop: 8 }}>Email: {data.Email}</p>
          </div>
          <div>
            <h3 style={{ marginTop: 8 }}>Invoice Details</h3>
            <p style={{ marginTop: 8 }}>Invoice No:{data.invoiceNumber}</p>
            <p style={{ marginTop: 8 }}>Invoice Date:{currentDate} </p>
            <p style={{ marginTop: 8 }}>Due Date:{data.AppointmentDate} </p>
          </div>
        </div>
        <div className="inv-table" style={{ marginTop: 50 }}>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th className="th">Details</th>
                 <th className="th"> </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td">Doctor Name</td>
                  <td className="td">{data.Doctorname}</td>
                </tr>
                <tr>
                  <td className="td">Appointment No</td>
                  <td className="td">{data.Appointmantno}</td>
                </tr>
                <tr>
                  <td className="td">Appointment Date</td>
                  <td className="td">{data.AppointmentDate}</td>
                </tr>
                <tr className="totle">
                  <td className="td">Total</td>
                  <td className="td">{data.Doctorfee}</td>
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
        <Button
          color="primary"
          onClick={() => {
            html2canvas(componentRef.current).then((canvas) => {
              const pdf = require("jspdf");
              // require("jspdf-autotable");
              const doc = new pdf.default({
                orientation: "landscape",
                unit:"px",
              });
              const imgData = canvas.toDataURL("image/png");
              const imgProps = doc.getImageProperties(imgData);
              const pdfWidth = doc.internal.pageSize.getWidth();
              console.log(pdfWidth);
              // const pdfWidth = 450;
              const pageStyle="@page { size: auto;  margin: 25px; } }"
              const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
              doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
              // doc.autoTable({ html: "#my-table" });
              doc.save(`invoice_${data.invoiceNumber}.pdf`,{ center: true },pageStyle);
            });
          }}
        >
          <HiDownload /> Download PDF
        </Button>
      </CardActions>
    </div>
  );
};
}

export default Invoice;
