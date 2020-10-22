#etcd-client

This is a simple wrapper `node-etcd` to simplify integration with the RBM ETCD instances.

Example usage:

```
  etcd.connect(process.env.ETCD_SRV).then(
    () => {
      etcd.watch('/imagedeliveryservice/origin/baseUrl', (err, value) => {
        if (err) {
          logger.error(err);
        } else {
          server.set('origin', value);
        }
      });

      etcd.watch('/imagedeliveryservice/origin/accessParameters', (err, value) => {
        if (err) {
          logger.error(err);
        } else {
          server.set('accessParameters', value);
        }
      });
    },
    e => {
      logger.error(e);
    }
  );
```
