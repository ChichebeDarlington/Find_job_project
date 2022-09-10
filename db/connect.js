// "mongodb+srv://<username>:<password>@merncamp.ww8hn.mongodb.net/?retryWrites=true&w=majority";

import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
