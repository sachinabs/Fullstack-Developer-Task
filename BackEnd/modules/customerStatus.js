var MongoClient = require('mongodb').MongoClient;

exports.statusOfBooking = function (req, res) {
    
    let userEmail = req.query.email;
    async function findListings(client) {
        const cursor = await client.db("bikeapp").collection("service").find({'Email':userEmail});
        const results =  await cursor.toArray();
        res.json(results);
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