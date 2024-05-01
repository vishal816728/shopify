import app from "./app.js";
import "dotenv/config"
import DBConnectionMongo from "./DB/Mongo.js";


const PORT=process.env.PORT || 7000

process.on("uncaughtException", (err) => {
    console.log(err);
    console.log(`server is closing due to unhandled uncaught Exceptions`);
    process.exit(1);
  });

// DB Connection call
DBConnectionMongo()

app.listen(PORT,()=>{
        console.log(`server is listening on ${PORT}`)
})

process.on("unhandledRejection", (err) => {
    console.log(`message: ${err}`);
    console.log("process is exiting due to unhandled rejection");
    process.exit(1);
  });