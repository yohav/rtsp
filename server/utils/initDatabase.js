import mongoose from 'mongoose';

const initDatabase = () => {
    return mongoose.connect(process.env.DATABASE_URL, {
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASS
    });
};

mongoose.connection.on('connected', function(){
    console.log("Connected to ", process.env.DATABASE_URL);
});

mongoose.connection.on('error', function(err){
    handleError(err);
});

mongoose.connection.on('disconnected', function(){
    console.log("Disconnected DB");
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log("Application terminated, disconnecting DB");
        process.exit(0)
    });
});

function handleError(err){
    logError(err);
}

function logError(err){
    console.log(err);
}

export default initDatabase;
