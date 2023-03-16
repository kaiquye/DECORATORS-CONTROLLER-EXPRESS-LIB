import {
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
} from "./validationObjectTransfer.service";
import express from "express";
import {
  Controller,
  GlobalMiddleware,
  Post,
  Get,
  Put,
  Middleware,
  Patch,
  Delete,
  ValidateBody,
  ValidateParam,
  ValidateQuery,
  ControllerBase,
  controllers,
} from "./controllerDecoreitor.service";

import {
  applyDecoratorsControllers,
  applyControllerDecorator,
} from "./adapters.service";
import { ControllerTest } from "./controller-test";
const app = express();

app.use(express.json());
applyDecoratorsControllers(app, [ControllerTest]);
app.listen(3000, () => console.log("runnig"));

export {
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
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
  applyDecoratorsControllers,
  applyControllerDecorator,
};
