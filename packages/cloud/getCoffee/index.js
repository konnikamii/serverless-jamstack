const MongoClient = require('mongodb').MongoClient;

console.log('Connecting to MongoDB...');
async function main(args) {
    const uri = process.env.DATABASE_URL;
    console.log(process.env);
    console.log(`Connecting to MongoDB with URI: ${uri}`);
    let client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const inventory = await client.db("do-coffee").collection("available-coffees").find().toArray();
        console.log('Retrieved inventory:', inventory);
        return {
            "body": inventory
        };
    } catch (e) {
        console.error('Error retrieving data:', e);
        return {
            "body": { "error": "There was a problem retrieving data." },
            "statusCode": 400
        };
    } finally {
        await client.close();
        console.log('Closed MongoDB connection');
    }
}

main().then(result => {
    console.log('Function result:', result);
}).catch(error => {
    console.error('Function error:', error);
});

module.exports.main = main;