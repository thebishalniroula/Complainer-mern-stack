import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const connectToDb = (conn_string: string) =>
  mongoose.connect(conn_string, (err: any) => {
    if (err) {
      return console.error("Connection to db failed.", err);
    }
    console.log("Connected to db.");
  });
