var MongoClient = require('mongodb').MongoClient;
exports.showAllCompleted = function (req, res) {

    

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

    async function findListings(client) {
        const cursor = await client.db("bikeapp").collection("service").find({'Status':3});
        const results =  await cursor.toArray();
        
        if(results.length == 0)
        {
            res.json({
                'status' : 0,
            })
        }
        else
        {
            res.json(results)
        }
       
    }
   
    main().catch(console.error);    
}