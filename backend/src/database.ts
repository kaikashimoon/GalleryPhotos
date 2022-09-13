import {connect, ConnectOptions} from "mongoose";

const startConnection = () => { 
   connect('mongodb://localhost/photogallerydb', {
         useNewUrlParser: true, 
         useUnifiedTopology: true 
    } as ConnectOptions)
    console.log('database connection established');
}

export default startConnection;
