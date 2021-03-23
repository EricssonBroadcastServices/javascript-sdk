import Etcd from "node-etcd";
import * as dns from "dns";

let etcd: Etcd;

function convertNodeToJson<T>(node: any): T {
  if (node.dir) {
    const directory = {};
    node.nodes.forEach((node: any) => {
      const paths = node.key.split("/");
      const path = paths[paths.length - 1];
      directory[path] = convertNodeToJson(node);
    });
    return directory as T;
  } else {
    return node.value;
  }
}

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
 * Get the provided key eg. /foo/bar
 * @param {string}            key         path to the key in ETCD
 * @return {Promise<T>} resolves with string if OK, rejects with any error
 */
export function get<T>(key: string): Promise<T> {
  return new Promise((resolve, reject) => {
    etcd.get(key, { recursive: true }, (err: any, success: any) => {
      if (success) {
        const { node } = success;
        resolve(convertNodeToJson(node));
      } else {
        reject(new Error(`[node-etcd] ${err}`));
      }
    });
  });
}

/**
 * Watch the provided key eg. /foo/bar and also get the initial value
 * @param {string}            key         path to the key in ETCD
 * @param {IEtcdClientError, T) =>  void}  callback    function to be called when the value is available/has changed
 */
export function watch<T>(
  key: string,
  interval = 60 * 1000,
  callback: (error: Error | null, value: T | null) => void
): () => void {
  let timeout: NodeJS.Timeout;
  const getWatchedKey = () => {
    get<T>(key).then(
      value => {
        callback(null, value);
        timeout = setTimeout(getWatchedKey, interval);
      },
      err => {
        callback(err, null);
        timeout = setTimeout(getWatchedKey, interval);
      }
    );
  };
  getWatchedKey();
  return () => {
    clearTimeout(timeout);
  };
}
