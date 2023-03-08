import mongoose from 'mongoose';

const connect = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url).catch((err) => console.log(err));
};
export default connect;
