var MongoClient = require('mongodb').MongoClient;
exports.inProgress = function (req, res) {

   let serviceId = req.query.ServiceId;
    


    async function findListings(client) {
        const cursor = await client.db("bikeapp").collection("service").updateOne({ "ServiceId": serviceId}, { $set: { 'Status': 1 } });
       
        if (cursor.matchedCount == 1) {
            res.send("<script>alert('On Work')</script>");

        }
        else {
            res.json({
                'message': "Failed to change the status",
                'status': 0
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