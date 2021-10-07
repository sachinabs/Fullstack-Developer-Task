var MongoClient = require('mongodb').MongoClient;
exports.mailer = function (req, res) {
    let serviceId = req.query.Id;


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


      async function findListings(client) {
        const cursor = await client.db("bikeapp").collection("service").find({"ServiceId":serviceId});
        const results =  await cursor.toArray();
        
        if(results.length== 0)
        {
            res.json({
                'message':"mail not send"
            })
        }
        else
        {
            
            let mailOptions = {
                from: "anishbalasachin13@gmail.com", //server admin
                to: results[0].Email,
                subject: "Hello..! Your bike is now out for delivery",
                text: "From sachin, Your Bike " + results[0].BikeNumber +" is now out for delivery."
              }
              transport.sendMail(mailOptions, function (err, success) {

                if (err) {
                    
                  console.log(err);
                }

              })

              res.send("<script>alert('E-Mail Sent')window.location.href ='http://127.0.0.1:5502/index.html'</script>");

              
        }
       
    }
    async function main() {
        const uri =
            "mongodb+srv://sachin:sachinabs@cluster0.iaz5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const pen = await findListings(client, res);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);

}