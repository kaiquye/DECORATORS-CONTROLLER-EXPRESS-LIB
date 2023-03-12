import {
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
} from "./validationObjectTransfer.service";
import { Controller, ControllerBase } from "./controllerDecoreitor.service";

@Controller()
export class Teste extends ControllerBase {}

export {
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
  ControllerBase,
};
