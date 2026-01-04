const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');

const db = require('./models/index');
// const {Airplane} = require('./models/index');

  const app = express();
 app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
const setupAndStartServer = async () => {

    // create the express object
  

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', ApiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);
        if(process.env.SYNC_DB) {
            db.sequelize.sync({alter: true});
        }
    });
}

setupAndStartServer();
