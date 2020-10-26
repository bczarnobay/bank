import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
 
const mongod = new MongoMemoryServer()
 
class DbHandler {
/**
* Connect to the in-memory database.
*/
 public async connect () {
   const uri = await mongod.getConnectionString()
 
   const mongooseOpts = {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
   }
 
   await mongoose.connect(uri, mongooseOpts)
 }
 
 /**
* Drop database, close the connection and stop mongod.
*/
 public async closeDatabase () {
   await mongoose.connection.dropDatabase()
   await mongoose.connection.close()
   await mongod.stop()
 }
 
 /**
* Remove all the data for all db collections.
*/
 public async clearDatabase () {
   const collections = mongoose.connection.collections
 
   for (const key in collections) {
     const collection = collections[key]
     await collection.deleteMany({})
   }
 }
}
export default new DbHandler()
 

