import * as pbkdf2 from "pbkdf2";
import * as crypto from "crypto";
import { PasswordAlgorithm, PasswordHashConfig } from "../models/system-config-model";
import { Credentials, PasswordTuple } from "../services/authentication-service";

function sha512(str) {
  return crypto
    .createHash("sha512")
    .update(str)
    .digest();
}

export async function hashIt(username: string, password: string, iterations: number, sharedRandom: string) {
  return new Promise((resolve, reject) => {
    pbkdf2.pbkdf2(password, sha512(username + sharedRandom), iterations, 64, "sha512", (err, hash) => {
      if (err) {
        reject(err.toString());
      }
      resolve(hash.toString("hex"));
    });
  });
}

export async function getPassword(
  username: string,
  passwordValue: string,
  algorithm: PasswordAlgorithm,
  hashConfig: PasswordHashConfig
): Promise<PasswordTuple> {
  switch (algorithm.algorithmName) {
    case "PBKDF2":
      const hashed = await hashIt(
        username,
        passwordValue,
        algorithm.pbkdf2Iterations as number,
        hashConfig.sharedRandom
      );
      return {
        algorithm: {
          algorithmName: algorithm.algorithmName,
          pbkdf2Iterations: algorithm.pbkdf2Iterations
        },
        value: hashed as string
      };
    default: {
      return {
        algorithm: {
          algorithmName: algorithm.algorithmName
        },
        value: passwordValue
      };
    }
  }
}

export async function getCredentials(
  username: string,
  password: string,
  hashConfig: PasswordHashConfig
): Promise<Credentials> {
  const tuples: Promise<PasswordTuple>[] = [];

  hashConfig.algorithms.forEach(a => tuples.push(getPassword(username, password, a, hashConfig)));
  return {
    passwordTuples: await Promise.all(tuples)
  };
}
