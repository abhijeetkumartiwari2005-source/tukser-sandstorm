import mongoose from 'mongoose';
const connectDB = async ()=>{
try{
    const conn=   await mongoose.connect(process.env.MONGO_URI);
    console.log(`you are connected to : ${conn.connection.host}`)
}
catch(error){
    console.error(`database connection error :${error.message}`);
    process.exit(1);

}

};
export default connectDB
