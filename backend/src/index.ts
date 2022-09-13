import app from "./app";
import startConnection from "./database";

const main = () => { 
    try {
        startConnection();
        app.listen(app.get('port'));
        console.log("server listening on port", app.get('port'));
    } catch (error) {
        console.log(error);
    }
}

main();