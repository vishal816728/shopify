const app = require("./app.js");
require("dotenv").config()


const PORT=process.env.PORT || 7000

process.on("uncaughtException", (err) => {
    console.log(err);
    console.log(`server is closing due to unhandled uncaught Exceptions`);
    process.exit(1);
  });

app.listen(PORT,()=>{
        console.log(`server is listening on ${PORT}`)
})

process.on("unhandledRejection", (err) => {
    console.log(`message: ${err}`);
    console.log("process is exiting due to unhandled rejection");
    server.close(() => {
      process.exit(1);
    });
  });