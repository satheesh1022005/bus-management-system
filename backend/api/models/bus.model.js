const mongoose = require("mongoose");
const busSchema = mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    current_latitude: Number,
    current_longitude: Number,
    bus_reg_no: String,
    destination: String,
    driver_name: String,
    stops: [
      {
        bus_stop: String,
        time: String,
        lattitude: Number,
        longitude: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const busData = mongoose.model("bus-data", busSchema);
module.exports = busData;
