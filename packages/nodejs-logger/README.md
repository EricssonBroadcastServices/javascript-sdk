#nodejs-logger

This is a simple file logger to log in the correct format for RBMs analytics.

Example usage

```
 import { setupLogger, logger } from '@ericssonbroadcastservices/nodejs-logger';

 // make sure the path matches the one setup in marathon.
 setupLogger(path.resolve(__dirname, '../logs'), process.env.LOG_TO_CONSOLE === "true");
 logger.error(err);
 logger.warn(warn);
 logger.info(info)
```
