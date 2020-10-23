import Etcd from "node-etcd";
import * as dns from "dns";

let etcd: Etcd;

/**
 * Connect to ETCD using the provided SRV domain
 * @param  {string}        srv  the SRV domain without the etcd prefixes used by RBM
 * @return {Promise<void>}      resolves with nothing if OK, rejects with any error
 */
export function connect(srv: string): Promise<void> {
  return dns.promises.resolve(`_etcd._tcp.${srv}`, "SRV").then(records => {
    etcd = new Etcd(records.map(record => `http://${record.name}:${record.port}`));
    return new Promise((resolve, reject) => {
      etcd.selfStats((err: Error, success: any) => {
        if (err) {
          reject(new Error(`[node-etcd] ${err}`));
        } else {
          resolve();
        }
      });
    });
  });
}

/**
 * Watch the provided key eg. /foo/bar and also get the initial value
 * @param {string}            key         path to the key in ETCD
 * @param {IEtcdClientError, string) =>  void}  callback    function to be called when the value is available/has changed
 */

export function watch(key: string, callback: (error: Error | null, value: string | null) => void) {
  etcd.watcher(key).on("change", ({ node }) => {
    if (node) {
      callback(null, node.value);
    }
  });
  etcd.get(key, (err: any, success: any) => {
    if (success) {
      const { node } = success;
      callback(null, node.value);
    } else {
      callback(new Error(`[node-etcd] ${err}`), null);
    }
  });
}
