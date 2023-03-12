import { Express } from "express";
import { GlobalError } from "./globalError.error";
import { DtoBase } from "./validationObjectTransfer.service";

interface InterfaceControllerConfig {
  // instance of express
  instanceApp: Express;
  globalError;
}

enum TypesMethodsRouter {
  _post = "post",
  _get = "get",
  _patch = "patch",
  _delete = "delete",
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
  const nameRouter = name === undefined ? "/" : name;
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (_value) {
      return globalConfig.globalError(
        "decorator is not on top of a certain function, please check that you have not placed the POST method on top of a valid function"
      );
    }
    if (target._routers?.push !== undefined) {
      target._routers.push({
        status: TypesMethodsRouter._post,
        toFunction: key,
        nameRouter,
        func: _value,
      });
    } else {
      target._routers = [
        {
          status: TypesMethodsRouter._post,
          toFunction: key,
          nameRouter,
          func: _value,
        },
      ];
    }
  };
};
const Get = (name?: string): Function => {
  const nameRouter = name === undefined ? "/" : name;
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (target._routers?.push !== undefined) {
      target._routers.push({
        status: TypesMethodsRouter._get,
        toFunction: key,
        nameRouter,
        func: _value,
      });
    } else {
      target._routers = [
        {
          status: TypesMethodsRouter._get,
          toFunction: key,
          nameRouter,
          func: _value,
        },
      ];
    }
  };
};

const ValidateDto = (dto: DtoBase) => {
  return (target: ControllerBase, key: string): void => {
    if (target._middlewaresDto?.push !== undefined) {
      target._middlewaresDto.push({
        toFunction: key,
        dtoValidation: [DtoBase],
      });
    } else {
      target._middlewaresDto = [{ toFunction: key, dtoValidation: [DtoBase] }];
    }
  };
};

export { ControllerBase, Controller, Post, Get, ValidateDto };
