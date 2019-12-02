const { MongoClient } = require('mongodb');

async function main(){
    const uri = 'mongodb+srv://tsmilgius:<password>@temps-39kmv.azure.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();
        //await listDatabases(client);
        //await findAllDocuments(client);
        const dataObject = await findMostRecentData(client);
        console.log(dataObject[0].temperature.toString());
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function findAllDocuments(client) {
    result = await client.db('test').collection('values').find().toArray();
    if(result) {
        console.log(result);
    } else {
        console.log('No results');
    }
}
async function findMostRecentData(client) {
    result = await client.db('test').collection('values').find().sort({ addedDate: -1 }).limit(1).toArray();
    if(result) {
        return result
    } else {
        console.log('No results');
    }
}

main().catch(console.err);