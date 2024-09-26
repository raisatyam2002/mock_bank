import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (process.env.MONGO_URL) {
      console.log("db ", process.env.MONGO_URL);

      await mongoose.connect(process.env.MONGO_URL);
      console.log("connected to db");
    }
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
