var MongoClient = require('mongodb').MongoClient;
let makeUserId = require('../external_JS/id_making');

exports.userLogin = function (req,  res) {
    let mail = req.query.userEmail;
    let password = req.query.userPassword;
    console.log("mail---->", mail);
    console.log("password---->", password);
    async function findListings(client) {
        const cursor = client.db("bikeapp").collection("user").find({ "Mail": mail } && { "Password": password });
        const results = await cursor.toArray();
        console.log(results);
        if (results.length >= 1) {
            res.json({
                'message': "Verified user",
                'status': true,
                'mail' : mail,
            })
            
        }
        else {
            res.json({
                'message': "User not found",
                'status': false,
            })
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


exports.userSignIN = function (req, res) {
    
    let mail = req.query.UserMail;
    let password = req.query.userPassword
    let newUserData ={
        'Mail' : mail,
        'Password':password
    }

 
    

    async function findListings(client) {
        const cursor = await client.db("bikeapp").collection("user").find({"Mail":{$in:[mail]}});
        const results =  await cursor.toArray();
        console.log(results.length)
        
        if (results.length>=1) {
            res.json({
                'message': "User exists",
                'status': false,
                'mail': mail,
            })
        }
        else {
            console.log("insert new");
            const newUser =  await client.db("bikeapp").collection("user").insertOne(newUserData);;
            if(newUser.acknowledged === true)
            {
                res.json({
                    'message':"New user created",
                    'status' : true,
                    'mail' : mail
                })
            }
            
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