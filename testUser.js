const mongoose = require("mongoose");
const User = require("./models/User");

async function main(){
    try {
    await mongoose.connect("mongodb+srv://marieycorentin97_db_user:5mnvRFbBUW4HhrpM@cluster0.snvtxyv.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB is connected :)");
    
   const u = new User ({
        username:"josh",
        email:"email@gmail.com",
        password:"joshua1234"
});
    
    await u.save();
    console.log("User Saved",u);

    await mongoose.disconnect();
    }
    catch(err){
        console.log("Error :", err.message);
    }
}

main();