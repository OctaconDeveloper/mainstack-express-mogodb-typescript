import app from "./app";
import { PORT } from "./utils/config.utils";
import { Logger } from "./utils/logger.util";

const logger = new Logger();

app.listen(PORT, () => {

    logger.info('Express server listening on port ' + PORT)
})