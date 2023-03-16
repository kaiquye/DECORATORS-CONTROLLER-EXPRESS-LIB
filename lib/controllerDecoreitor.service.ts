import { Express, Router } from "express";
import { GlobalError } from "./globalError.error";
import { ValidationObject } from "./validationObjectTransfer.service";

interface InterfaceControllerConfig {
  // instance of express
  instanceApp: Router;
  globalError;
  controllers;
}

enum TypesMethodsRouter {
  _post = "post",
  _get = "get",
  _patch = "patch",
  _delete = "delete",
  _put = "put",
}

let globalConfig: InterfaceControllerConfig = {
  globalError: null,
  instanceApp: null,
  controllers: null,
};

/**
 * @param instanceApp
 * @return {void}
 * @description: start before your routes and controller.
 */
//centering error on an object
globalConfig.globalError = GlobalError;
globalConfig.instanceApp = Router();
const controllers = (controllers) => {
  return (globalConfig.controllers = controllers);
};

/**
 * @description: this server base to check if your control is valid.
 */
abstract class ControllerBase {
  public _router: Router = Router();
  // all routers controller
  public _routers = [];
  public _globalMiddleware;
  public _functionMiddleware;
  // all body controller
  public _bodyValidators = [];
  public _paramValidators = [];
  public _queryValidators = [];
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
const Controller = (name: string): Function => {
  const nextFunction = (req, res, next) => next();
  return (target: any, key: string): void => {
    // prototypes
    target.prototype._router = Router();
    const _routersController = target.prototype._routers;
    const _dtoBodyController: [] = target.prototype._bodyValidators as any;
    const _dtoParamController: [] = target.prototype._paramValidators as any;
    const _dtoQueryController: [] = target.prototype._queryValidators as any;
    const _globalMiddleware: [] = target.prototype._globalMiddleware as [];
    const _functionMiddleware: [] = target.prototype._functionMiddleware as any;
    for (const _routersControllerElement of _routersController) {
      let _bodyValidators;
      if (_dtoBodyController) {
        _bodyValidators = _dtoBodyController.find(
          (dtoBody) =>
            dtoBody["toFunction"] === _routersControllerElement.toFunction
        );
      }
      let _paramValidators;
      if (_dtoParamController) {
        _paramValidators = _dtoParamController.find(
          (dtoParam) =>
            dtoParam["toFunction"] === _routersControllerElement.toFunction
        );
      }
      let _queryValidators;
      if (_dtoQueryController) {
        _queryValidators = _dtoQueryController.find(
          (dtoQuery) =>
            dtoQuery["toFunction"] === _routersControllerElement.toFunction
        );
      }
      let _middlewares;
      if (_functionMiddleware) {
        _middlewares = _functionMiddleware.find(
          (middleware) =>
            middleware["toFunction"] ===
            _routersControllerElement.toFunction + target.name
        );
      }
      target.prototype._router
        .use(_globalMiddleware !== undefined ? _globalMiddleware : nextFunction)
        ?.[_routersControllerElement.status](
          name + _routersControllerElement.nameRouter,
          _middlewares !== undefined ? _middlewares.middlewares : nextFunction,
          _bodyValidators !== undefined
            ? ValidationObject(_bodyValidators?.dtoValidation[0], "BODY")
            : nextFunction,
          _paramValidators !== undefined
            ? ValidationObject(_paramValidators?.dtoValidation[0], "PARAM")
            : nextFunction,
          _queryValidators !== undefined
            ? ValidationObject(_queryValidators?.dtoValidation[0], "QUERY")
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

const Put = (name?: string): Function => {
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
        status: TypesMethodsRouter._put,
        toFunction: key,
        nameRouter,
        callback: _value,
      });
    } else {
      target._routers = [
        {
          status: TypesMethodsRouter._put,
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

/**
 * @param name
 * @constructor
 * @example
 * ```ts
 * @ValidateParam(UserParamDto)
 * @Get("/:user_id")
 * profile(req, res) {}
 * ````
 */
const ValidateParam = (dto: any) => {
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (!_value) {
      return globalConfig.globalError(
        "decorator is not on top of a certain function, please check that you have not placed the POST method on top of a valid function"
      );
    }
    if (target._paramValidators?.push !== undefined) {
      target._paramValidators.push({
        toFunction: key,
        dtoValidation: [dto],
      });
    } else {
      target._paramValidators = [{ toFunction: key, dtoValidation: [dto] }];
    }
  };
};

/**
 * @param dto
 * @constructor
 * @example
 * ```ts
 * @ValidateQuery(UserQueryDto)
 * @Get("/")
 * profile(req, res) {}
 * ````
 */
const ValidateQuery = (dto: any) => {
  return (target: ControllerBase, key: string): void => {
    const _value = target[key];
    if (!_value) {
      return globalConfig.globalError(
        "decorator is not on top of a certain function, please check that you have not placed the POST method on top of a valid function"
      );
    }
    if (target._queryValidators?.push !== undefined) {
      target._queryValidators.push({
        toFunction: key,
        dtoValidation: [dto],
      });
    } else {
      target._queryValidators = [{ toFunction: key, dtoValidation: [dto] }];
    }
  };
};

/**
 * @param middlewares
 * @constructor
 * @example
 * ```ts
 * @Controller("/v1/user/")
 * @GlobalMiddleware(AuthUser)
 * class UserController(req, res) {}
 * ````
 */
const GlobalMiddleware = (middlewares: Function | any): Function => {
  return (target: any, key: string): void => {
    target.prototype._globalMiddleware = middlewares;
  };
};

const Middleware = (
  className: string,
  middlewares: Function | any
): Function => {
  return (target: ControllerBase, key: string) => {
    if (middlewares === undefined || middlewares.length === undefined) {
      return globalConfig.globalError("invalid type middleware");
    }
    if (target._functionMiddleware?.push !== undefined) {
      target._functionMiddleware.push({
        toFunction: key + className,
        middlewares,
      });
    } else {
      target._functionMiddleware = [
        { toFunction: key + className, middlewares },
      ];
    }
  };
};

export {
  Controller,
  GlobalMiddleware,
  Post,
  Get,
  Middleware,
  Patch,
  Delete,
  ValidateBody,
  ValidateParam,
  ValidateQuery,
  ControllerBase,
  controllers,
};
