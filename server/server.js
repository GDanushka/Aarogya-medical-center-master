const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemon = require('nodemon');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { BlobStream } = require('blob-stream');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const { errorMonitor } = require('stream');
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'tutorial'
});

app.post('/login',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    db.query("Select * from users where username=? and password=?",[username,password],
    (err,result)=>{
        if(err){
           throw err;
    }else{
        if(result.length>0){
          req.session.user = result[0];
      
      res.json({ success: true ,username:username });
    } else {
      res.json({ success: false,message:'Incorrect username or password' });
    }
    }
});
});

app.post('/logout', (req, res) => {
  req.session.destroy(function(err) {
    if (err) throw err;
    res.json({ success: true, message: 'Logout Successful!' });
});
});

app.post('/apporegister',function(req,res){
    const id=req.body.id;
    const fname=req.body.fname;
    const email=req.body.email;
    const mobile=req.body.mobile;
    const idno=req.body.idno;
    const address=req.body.address;
    const gender=req.body.gender;
    const apodate=req.body.apodate;
    const apodoc=req.body.apodoc;
    const todaydate=req.body.todaydate;
    const amount=req.body.selectedDoctorFee;
    const chenlno=req.body.appointmentNo;
console.log(req.body);
    db.query("INSERT INTO appointmentdetail (`appoid`, `fname`, `email`, `moblie`, `idno`, `address`, `gender`, `appodate`, `doctor`, `todaydate`, `amount`, `chanel`) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)",
    [id,fname,email,mobile,idno,address,gender,apodate,apodoc,todaydate,amount,chenlno],
    (error,result)=>{
      if (error) {
        res.json({message: "error in nodemon1"});
      } else {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const formattedCurrentDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`; // set the current date to the first day of the current month
        
        db.query("UPDATE payment SET nopatient = IF(Month(date) = '"+currentMonth+"', nopatient + 1,1), date = '"+formattedCurrentDate+"' WHERE docname = '"+apodoc+"'", (error, result) => {
          if (error) {
            res.json({message: "error in nodemon2"});
          } else {
            res.json({message: "success"});
          }
        });
    }
  }
    );
});

app.post('/docregister',function(req,res){
    const id=`DR-${req.body.id}`;
    const fname=req.body.fname;
    const mobile=req.body.mobile;
    const email=req.body.email;
    const dob=req.body.dob;
    const gender=req.body.gender;
    const fees=req.body.fees;
    const joindate=req.body.joindate;
    const specialization=req.body.specialization;

    const today = new Date();
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    db.query("INSERT INTO doctordetails (docid, fullname, mobile, email, dob, gender, fees, joindate,specialization)VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)",[id,fname,mobile,email,dob,gender,fees,joindate,specialization],
    (err,result)=>{
        if(result ){
          db.query("INSERT INTO payment (docname, amount,date,center_fee) VALUES (? ,? ,?,500)",[id,fees,firstDayOfMonth], (error, result) => {
            if (error) {
              res.json({message: "error in nodemon2"});
            } else {
              res.json({message:'Doctor add successfully!'});
              // res.json({message: "success"});
            }
          });
          
        }else{
            res.json({message:"error in nodemon"});
        }
    });
});

app.post('/labreport',function(req,res){
  const patient_ID=req.body.patient_ID;
  const fullname=req.body.full_name;
  const age=req.body.age;
  const specimen=req.body.specimen;
  const blood_type=req.body.blood_typ;
  const fess=req.body.fess;
  const issue_Date=req.body.issue_date;
  const result=req.body.result;
console.log(req.body);
db.query("INSERT INTO lab_report(Patient_ID,Full_name,Age,Specimen_by,Blood_type,Fees,Issue_date,Result)VALUE(?,?,?,?,?,?,?,?)",[patient_ID,fullname,age,specimen,blood_type,fess,issue_Date,result],

(err,result)=>{
  if(err){
    res.json({success: false});
    console.log(err);
    
  }else{
    res.json({success: true});
  }
})
});

//....................get methods...............

app.get('/appotable',function(req,res){
  db.query("Select * from appointmentdetail limit 15",(error,results)=>{
      if(error) {
          throw error;
      }else{
          const formattedResults = results.map(item => {
              const date = new Date(item.appodate);
              const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
              return { ...item, appodate: formattedDate };
          });

          res.json(formattedResults);
          console.log(formattedResults);
      }
  })
});

app.get('/recentappotable',function(req,res){
  db.query("Select * from appointmentdetail order by todaydate DESC limit 5",(error,results)=>{
      if(error) {
          throw error;
      }else{
          res.json(results);
          console.log(results);
      }
  })
});

app.get('/doctable',function(req,res){
    db.query("Select * from doctordetails ",(error,results)=>{
        if(error) {
           throw error;
        }else{
        res.json(results);
        console.log(results);
        }
    })
});

app.get('/labreport',function(req,res){
  db.query("Select * from lab_report" ,(error,results)=>{
    if(error) {
      throw error;
    }else{
      res.json(results);
      console.log(results);
    }
  })
});

app.get('/docdetailstable',function(req,res){
    db.query("Select * from doctordetails LIMIT 18446744073709551615 OFFSET 1 ",(error,results)=>{
        if(error) {
           throw error;
           
        }else{
            res.json(results);
            console.log(results);
        }
    })
});

app.get('/payment',function(req,res){
  db.query("Select *, (nopatient * amount) AS totamount FROM payment",(error,results)=>{
      if(error) {
         throw error;
         
      }else{
        const formattedResults = results.map(item => {
        const date = new Date(item.date);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return { ...item, date: formattedDate };
    });
        res.json(formattedResults);
        console.log(formattedResults);
      }
  })
});

app.get('/doctors/:doctorid/next', (req, res) => {
  const doctorId = req.params.doctorid;
  const today = new Date();
  const currentDate = new Date().toISOString().slice(0, 10);
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const query = "SELECT COUNT(*) as total FROM appointmentdetail WHERE doctor= '"+doctorId+"' and DATE(appodate)='"+currentDate+"'";

  db.query(query, (error, results, fields) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const count = results[0].total;
      const appointmentNo = `${count + 1}`;
      res.send( appointmentNo.toString() );
  
    }
  });
});

  //........................Editing.................../

  app.post('/docdetailstable/edit', (req, res) => {
    const  id  = req.body.docid;
  const { docid, fullname, mobile, fees, status } = req.body;

  const query = "UPDATE doctordetails SET docid=?, fullname=?, mobile=?, fees=?, status=? WHERE docid='"+id+"'";

  db.query(query, [docid, fullname, mobile, fees, status], (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      
      db.query("UPDATE payment SET amount=? WHERE docname = '"+id+"'",[fees], (error, result) => {
        if (error) {
          res.json({message: "error in nodemon2"});
        } else {
          res.json({message:'Doctor updated successfully!'});
          // res.json({message: "success"});
        }
      });
    }
  });
});

  //......................dashboard....................//
  app.get('/chart', (req, res) => {
    db.query('SELECT amount,center_fee,nopatient FROM payment GROUP BY docname', (error, results, fields) => {
        if (error) throw error;
      
        // calculate the earnings for each doctor and for the center
        const earnings = [];
        results.forEach((result) => {
          const amount= result.amount;
          const centerfee=result.center_fee;
          const nopatient=result.nopatient;
          const doctorEarnings = amount*nopatient;
          const CenterEarnings=centerfee*nopatient;
          const DoctorEarnings=doctorEarnings-CenterEarnings;
       

          earnings.push({
            DoctorEarnings: DoctorEarnings,
            CenterEarnings: CenterEarnings,
          });
        });
      res.json(earnings);
        console.log(earnings); // print the earnings data
      });
  });

  app.get('/chart1', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // get the current date in the format 'YYYY-MM-DD'
    db.query(`SELECT COUNT(*) as num_patients FROM appointmentdetail WHERE DATE(todaydate) = '${currentDate}'`, (error, results, fields) => {
      if (error) throw error;
      const numPatients = results[0].num_patients;
      const totalFees = results[0].total_fees;
  
      db.query(`SELECT doctor, COUNT(*) as num_patients, SUM(amount) as total_fees, MONTH(appodate) as month  FROM appointmentdetail WHERE MONTH(appodate) = MONTH(CURRENT_DATE()) GROUP by MONTH(appodate)`, (error, results, fields) => {
        if (error) throw error;
        const earnings = [];
        results.forEach((result) => {
          const patient = result.num_patients;
          const month = result.month;
          const amount = result.total_fees;
          const day = result.day;
          earnings.push({
            month: month,
            patient: patient,
            amount: amount,
            numPatients: numPatients,
            // day: day
          });
        });
        res.json(earnings);
        console.log(earnings);
        console.log(numPatients);
        console.log(totalFees);
      });
    });
  });
  
  

  //.................delete............
  
  app.delete('/doctors/:id', (req, res) => {
    const id = req.params.id;

    // Delete related rows from child tables first
    const deletePayments = 'DELETE FROM payment WHERE docname = ?';
    const deleteAppointments = 'DELETE FROM appointmentdetail WHERE doctor = ?';
    db.query(deletePayments, [id], (error, results) => {
        if (error) throw error;
        db.query(deleteAppointments, [id], (error, results) => {
            if (error) throw error;
            
            // Delete row from parent table
            const deleteDoctor = 'DELETE FROM doctordetails WHERE docid = ?';
            db.query(deleteDoctor, [id], (error, results) => {
                if (error) throw error;
                res.json({ message: "Successfully deleted" });
            });
        });
    });
});
  
//..................db connection...............

db.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("MySQL Connected");
    }
})

app.listen(3001, () => {
    console.log("running on port 3001");
});

