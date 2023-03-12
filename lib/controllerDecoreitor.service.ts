import { Express } from "express";
import { GlobalError } from "./globalError.error";

interface InterfaceControllerConfig {
  // instance of express
  instanceApp: Express;
  globalError;
}

let globalConfig: InterfaceControllerConfig;

/**
 * @param instanceApp
 * @return {void}
 * @description: start before your routes and controller.
 */
export const ControllerConfig = (instanceApp: Express): void => {
  //centering error on an object
  globalConfig.globalError = GlobalError;
  if (instanceApp === undefined) {
    globalConfig.globalError("instance express not found");
  }
  globalConfig.instanceApp = instanceApp;
};
