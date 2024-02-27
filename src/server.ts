import application from ".";
import { PORT } from "./config/env.config";

application.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});