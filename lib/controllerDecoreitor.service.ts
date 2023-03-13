import { Express } from "express";
import { GlobalError } from "./globalError.error";
import { ValidationObject } from "./validationObjectTransfer.service";

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

let globalConfig: InterfaceControllerConfig = {
  globalError: null,
  instanceApp: null,
};

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

/**
 * @description: this server base to check if your control is valid.
 */
abstract class ControllerBase {
  // all routers controller
  public _routers = [];
  // all body controller
  public _bodyValidators = [];
  public _midd;
}

/**
 * @param name main name of your route
 * @constructor
 * @return function
 * @example
 * ```ts
 * @Controller("/v1/user")
 * export class UserController {}
 * ````
 */
const Controller = (name?: string): Function => {
  const nextFunction = (req, res, next) => next();
  return (target: any, key: string): void => {
    const _routersController = target.prototype._routers;
    const _dtosController: [] = target.prototype._bodyValidators as any;
    for (const _routersControllerElement of _routersController) {
      let dtoElement;
      if (_dtosController) {
        dtoElement = _dtosController.find(
          (dto) => dto["toFunction"] === _routersControllerElement.toFunction
        );
      }
      globalConfig.instanceApp?.[_routersControllerElement.status](
        _routersControllerElement.nameRouter,
        dtoElement !== undefined
          ? ValidationObject(dtoElement?.dtoValidation[0], "BODY")
          : nextFunction,
        _routersControllerElement.callback
      );
    }
  };
};

/**
 * @param name
 * @constructor
 * @example
 * ```ts
 * @Post("/login")
 * login(req, res) {}
 * ````
 */
const Post = (name?: string): Function => {
  const nameRouter = name === undefined ? "/" : name;
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (!_value) {
      return globalConfig.globalError(
        "decorator is not on top of a certain function, please check that you have not placed the POST method on top of a valid function"
      );
    }
    if (target._routers?.push !== undefined) {
      target._routers.push({
        status: TypesMethodsRouter._post,
        toFunction: key,
        nameRouter,
        callback: _value,
      });
      0;
    } else {
      target._routers = [
        {
          status: TypesMethodsRouter._post,
          toFunction: key,
          nameRouter,
          callback: _value,
        },
      ];
    }
  };
};

/**
 * @param name
 * @constructor
 * @example
 * ```ts
 * @Get("/find")
 * find(req, res) {}
 * ````
 */
const Get = (name?: string): Function => {
  const nameRouter = name === undefined ? "/" : name;
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (!_value) {
      return globalConfig.globalError(
        "decorator is not on top of a certain function, please check that you have not placed the POST method on top of a valid function"
      );
    }
    if (target._routers?.push !== undefined) {
      target._routers.push({
        status: TypesMethodsRouter._get,
        toFunction: key,
        nameRouter,
        callback: _value,
      });
    } else {
      target._routers = [
        {
          status: TypesMethodsRouter._get,
          toFunction: key,
          nameRouter,
          callback: _value,
        },
      ];
    }
  };
};

/**
 * @param name
 * @constructor
 * @example
 * ```ts
 * @Patch("/profile")
 * profile(req, res) {}
 * ````
 */
const Patch = (name?: string): Function => {
  const nameRouter = name === undefined ? "/" : name;
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (!_value) {
      return globalConfig.globalError(
        "decorator is not on top of a certain function, please check that you have not placed the POST method on top of a valid function"
      );
    }
    if (target._routers?.push !== undefined) {
      target._routers.push({
        status: TypesMethodsRouter._patch,
        toFunction: key,
        nameRouter,
        callback: _value,
      });
    } else {
      target._routers = [
        {
          status: TypesMethodsRouter._patch,
          toFunction: key,
          nameRouter,
          callback: _value,
        },
      ];
    }
  };
};

/**
 * @param name
 * @constructor
 * @example
 * ```ts
 * @Delete("/profile")
 * profile(req, res) {}
 * ````
 */
const Delete = (name?: string): Function => {
  const nameRouter = name === undefined ? "/" : name;
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (!_value) {
      return globalConfig.globalError(
        "decorator is not on top of a certain function, please check that you have not placed the POST method on top of a valid function"
      );
    }
    if (target._routers?.push !== undefined) {
      target._routers.push({
        status: TypesMethodsRouter._delete,
        toFunction: key,
        nameRouter,
        callback: _value,
      });
    } else {
      target._routers = [
        {
          status: TypesMethodsRouter._delete,
          toFunction: key,
          nameRouter,
          callback: _value,
        },
      ];
    }
  };
};

/**
 * @param name
 * @constructor
 * @example
 * ```ts
 * @ValidateBody(UserDto)
 * @Post()
 * profile(req, res) {}
 * ````
 */
const ValidateBody = (dto: any) => {
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (!_value) {
      return globalConfig.globalError(
        "decorator is not on top of a certain function, please check that you have not placed the POST method on top of a valid function"
      );
    }
    if (target._bodyValidators?.push !== undefined) {
      target._bodyValidators.push({
        toFunction: key,
        dtoValidation: [dto],
      });
    } else {
      target._bodyValidators = [{ toFunction: key, dtoValidation: [dto] }];
    }
  };
};

const ValidateParam = (dto: any) => {
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (!_value) {
      return globalConfig.globalError(
        "decorator is not on top of a certain function, please check that you have not placed the POST method on top of a valid function"
      );
    }
    if (target._bodyValidators?.push !== undefined) {
      target._bodyValidators.push({
        toFunction: key,
        dtoValidation: [dto],
      });
    } else {
      target._bodyValidators = [{ toFunction: key, dtoValidation: [dto] }];
    }
  };
};

export { ControllerBase, Controller, Post, Get, Patch, Delete, ValidateBody };
