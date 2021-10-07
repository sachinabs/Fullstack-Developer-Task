var MongoClient = require('mongodb').MongoClient;
exports.pendingBooking = function (req, res) {

    async function findListings(client) {
        const cursor = await client.db("bikeapp").collection("service").find({ $or: [ { "Status": 0  }, { "Status": 1 } ] });
        const results =  await cursor.toArray();
        if(results.length== 0)
        {
            res.json({
                'message':"No pending Bookings"
            })
        }
        else
        {
            res.json(results);
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