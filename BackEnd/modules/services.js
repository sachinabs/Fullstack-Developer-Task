var MongoClient = require('mongodb').MongoClient;

const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anishbalasachin13@gmail.com",
    pass: "qqtcfzinvbncipjq"
  },
  tls: {
    rejectUnauthorized: false,
  },
})


function makeId(length){
  var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



exports.userServices = function (req, res) {
  let userEmail = req.query.user; 
  let userBike = req.query.userBike;
  let userDate = new Date();
  let userService = req.query.service;

  

  let service = {
    'Email': userEmail,
    'BikeNumber': userBike,
    'Service': userService,
    'ServiceId':makeId(5),
    'AppliedDate': userDate,
    'DeliveredDate':'',
    'Status':0
  }

  async function update(client) {
   

    async function createListing(client, newListing, response) {

      const bookService = await client.db("bikeapp").collection("service").insertOne(service);

      let mailOptions = {
        from: "anishbalasachin13@gmail.com", 
        to: userEmail,
        subject: "Hello Chief..! New service is booked",
        text: "From " + userEmail + " to Chief, You have a new service on Bike Number " + userBike
      }
      if (bookService.acknowledged === true) {
        console.log("hll")
        res.json({
          'msg': "Service booked",
          'user': userEmail,
          'status': 1
        });
        console.log("Email sent");
        transport.sendMail(mailOptions, function (err, success) {
          if (err) {
            console.log(err);
            res.json({
              'msg': "Service  not booked",
              'user': userEmail,
              'status': 0
            });
          }         
        })
      }

       else {
        console.log("Data Not Inserted");
        response.json({ status: false });
      }
    }


    async function main() {
      const uri =
        "mongodb+srv://sachin:sachinabs@cluster0.iaz5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

      const client = new MongoClient(uri);

      try {
        await client.connect();
        const pen = await createListing(client, service, res);
      } catch (e) {
        console.log("test");
        console.error(e);
      } finally {
        await client.close();
      }
    }
    main().catch(console.error);
  }


  async function main() {
    const uri =
      "mongodb+srv://sachin:sachinabs@cluster0.iaz5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
      await client.connect();
      const pen = await update(client, res);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  main().catch(console.error);
}