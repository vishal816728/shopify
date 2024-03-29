import mongoose from "mongoose"
async function DBConnectionMongo(){
    try{
       const connection =await mongoose.connect(process.env.MONGO_URI)
       if(connection){
            console.log(`Successfully established connection.`)
       }
    }catch(err){
        console.log(err)
        return err.message
    }
}

export default DBConnectionMongo;