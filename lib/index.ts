import {
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
} from "./validationObjectTransfer.service";
import {
  Controller,
  ControllerBase,
  Post,
} from "./controllerDecoreitor.service";
import { IsString } from "class-validator";

@Controller()
export class Teste extends ControllerBase {
  @Post()
  login() {
    return null;
  }
}

export {
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
  ControllerBase,
};
