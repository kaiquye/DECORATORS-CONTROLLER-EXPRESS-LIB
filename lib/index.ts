import {
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
} from "./validationObjectTransfer.service";
import {
  Controller,
  ControllerBase,
  Get,
  Post,
  ValidateBody,
  ValidateParam,
  ValidateQuery,
  GlobalMiddleware,
  Middleware,
  controllers,
} from "./controllerDecoreitor.service";

import express, { Router } from "express";
import { Test } from "./controllers";
import { applyDecoratorsControllers } from "./adapters.service";

const server = express();

server.use(express.json());

const app = applyDecoratorsControllers(server, [Test]);

app.listen(3002, () => console.log("runnig test"));

export {
  Controller,
  Get,
  Post,
  ValidateBody,
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
  ControllerBase,
  ValidateParam,
  ValidateQuery,
  GlobalMiddleware,
  Middleware,
};
