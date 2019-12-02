const { MongoClient } = require('mongodb');
const moment = require('moment');

async function main(){
    const uri = 'mongodb+srv://tsmilgius:E58-Qegqddf$KdW@temps-39kmv.azure.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();
        //await listDatabases(client);
        //await findAllDocuments(client);
        const dataObject = await findMostRecentData(client);
        console.log(formatResult(dataObject));
        console.log()
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

function formatResult(dataObject) {
  const temperature = dataObject[0].temperature;
  const humidity = dataObject[0].humidity;
  const time = moment(dataObject[0].addedDate).format('YYYY-MM-DD HH:mm');

  const formatedResult = time + ' buvo ' + temperature + '°C' + ' o santykinis oro drėgnumas: ' + humidity + '%';
  return formatedResult;
}

main().catch(console.err);