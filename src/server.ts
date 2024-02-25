import { PORT } from "./config/env.config";
const application = require('./src/index');

application.listen(PORT, (err: Error) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${PORT}`);
});