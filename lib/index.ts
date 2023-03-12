import {
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
} from "./validationObjectTransfer.service";
import {
  Controller,
  ControllerBase,
  ControllerConfig,
  Get,
  Post,
  ValidateDto,
} from "./controllerDecoreitor.service";
import { IsString } from "class-validator";

ControllerConfig("" as any);

class DtoTeste extends DtoBase {
  @IsString()
  name: string;

  constructor({ name }) {
    super();
    this.name = name;
  }
}

@Controller()
export class Teste extends ControllerBase {
  @Post()
  login() {
    return null;
  }

  @ValidateDto(DtoTeste)
  @Get()
  find() {
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
