// const http = require("http");
// const express = require("express");
// const WebSocket = require("ws");
// const mysql = require("mysql2");
// const cors = require("cors");
// const app = express();
// const server = http.createServer(app);
// app.use(cors());
// const wss = new WebSocket.Server({ server });
// //db
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "bus_tracking_system",
// });
// /**************************************************************************************************/
// function queryDatabase(query, callback) {
//   pool.getConnection(function (err, connection) {
//     if (err) {
//       callback(err, null);
//       return;
//     }
//     connection.query(query, function (err, results) {
//       connection.release();
//       callback(err, results);
//     });
//   });
// }

// function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(data));
//     }
//   });
// }

// function fetchDataAndBroadcast() {
//   const query = "SELECT * FROM live";
//   queryDatabase(query, function (err, results) {
//     if (err) {
//       console.error("Error fetching data from database:", err);
//       return;
//     }
//     broadcast(results);
//   });
// }

// wss.on("connection", function connection(ws) {
//   console.log("Client connected");
//   fetchDataAndBroadcast();

//   ws.on("message", function incoming(message) {
//     console.log("received: %s", message);
//   });

//   ws.on("close", function close() {
//     console.log("Client disconnected");
//   });

//   ws.on("error", function error(err) {
//     console.error("WebSocket error", err);
//   });
// });
// /*****************************************************************************************/
// app.post("/updateLive", (req, res) => {
//   //console.log(req.body);
//   //const { id, latitude, longitude } = req.body; // Assuming the frontend sends JSON data

//   // Update the database with the received data
//   const updateQuery = `UPDATE live SET latitude = ${12.571316}, longitude = ${78.8545} WHERE id = ${2}`;
//   queryDatabase(updateQuery, (err, results) => {
//     if (err) {
//       console.error("Error updating data in database:", err);
//       res.status(500).json({ error: "Failed to update data in the database" });
//       return;
//     }
//     // Broadcast updated data to all connected clients
//     fetchDataAndBroadcast();
//     res.status(200).json({ message: "Data updated successfully" });
//   });
// });
// /*****************************************************************************************/
// server.listen(8080, () => {
//   console.log("Server is running on port 8080");
// });

// setInterval(fetchDataAndBroadcast, 1000);

// const http = require("http");
// const express = require("express");
// const WebSocket = require("ws");
// const mysql = require("mysql2");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server, host: "192.168.189.157" });

// //db
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "bus_tracking_system",
// });
// //mongodb
// mongoose
//   .connect(
//     "mongodb+srv://satheesh1022005:pDpk3wCEZSjtsjcl@bmsbackend.3zfl0gw.mongodb.net/data-api?retryWrites=true&w=majority&appName=bmsBackend"
//   )
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// function queryDatabase(query, callback) {
//   pool.getConnection(function (err, connection) {
//     if (err) {
//       callback(err, null);
//       return;
//     }
//     connection.query(query, function (err, results) {
//       connection.release();
//       callback(err, results);
//     });
//   });
// }

// function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(data));
//     }
//   });
// }

// function fetchDataAndBroadcast() {
//   const query = "SELECT * FROM live";
//   queryDatabase(query, function (err, results) {
//     if (err) {
//       console.error("Error fetching data from database:", err);
//       return;
//     }
//     broadcast(results);
//   });
// }

// wss.on("connection", function connection(ws) {
//   console.log("Client connected");
//   fetchDataAndBroadcast();

//   ws.on("message", function incoming(message) {
//     console.log("received: %s", message);
//     const data = JSON.parse(message);
//     updateLive(data);
//   });

//   ws.on("close", function close() {
//     console.log("Client disconnected");
//   });

//   ws.on("error", function error(err) {
//     console.error("WebSocket error", err);
//   });
// });

// function updateLive(data) {
//   const { id, latitude, longitude } = data;
//   const updateQuery = `UPDATE live SET latitude = ${latitude}, longitude = ${longitude} WHERE id = ${id}`;
//   queryDatabase(updateQuery, (err, results) => {
//     if (err) {
//       console.error("Error updating data in database:", err);
//       return;
//     }
//     fetchDataAndBroadcast();
//   });
// }

// server.listen(8080, () => {
//   console.log("Server is running on port 8080");
// });
/**************************kick with mongodb************************************/

const http = require("http");
const express = require("express");
const WebSocket = require("ws");
// const mysql = require("mysql2");
const cors = require("cors");
const mongoose = require("mongoose");
const busData = require("./models/bus.model");
const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, host: "192.168.189.157" });

//db
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "bus_tracking_system",
// });
//mongodb
mongoose
  .connect(
    "mongodb+srv://satheesh1022005:pDpk3wCEZSjtsjcl@bmsbackend.3zfl0gw.mongodb.net/data-api?retryWrites=true&w=majority&appName=bmsBackend"
  )
  .then(() => {
    console.log("MongoDB connected");
    server.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// function queryDatabase(query, callback) {
//   pool.getConnection(function (err, connection) {
//     if (err) {
//       callback(err, null);
//       return;
//     }
//     connection.query(query, function (err, results) {
//       connection.release();
//       callback(err, results);
//     });
//   });
// }

function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

async function fetchDataAndBroadcast() {
  try {
    const results = await busData.find({});
    broadcast(results);
  } catch (err) {
    console.error("Error fetching data from database:", err);
  }
}

wss.on("connection", function connection(ws) {
  console.log("Client connected");
  fetchDataAndBroadcast();

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    const data = JSON.parse(message);
    updateLive(data);
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });

  ws.on("error", function error(err) {
    console.error("WebSocket error", err);
  });
});

async function updateLive(data) {
  const { id, current_latitude, current_longitude } = data;
  console.log(data);
  try {
    const result = await busData.updateOne(
      { _id: id },
      {
        $set: {
          current_latitude: current_latitude,
          current_longitude: current_longitude,
        },
      }
    );
    fetchDataAndBroadcast();
  } catch (err) {
    console.error("Error updating data in database:", err);
  }
}
