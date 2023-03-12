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

abstract class ControllerBase {
  public _routers = [];
  public _middlewaresDto = [];
}

const Controller = (name?: string): Function => {
  return (target: any, key: string): void => {
    const _routersController = target.prototype._routers;
    const _dtosController = target.prototype._middlewaresDto;

    console.log(_routersController, _dtosController);
  };
};

const Post = (name?: string): Function => {
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (target._routers?.push !== undefined) {
      target._routers.push({
        status: "post",
        toFunction: key,
        name,
        func: _value,
      });
    } else {
      target._routers = [
        { status: "post", toFunction: key, name, func: _value },
      ];
    }
  };
};

export { ControllerBase, Controller };
