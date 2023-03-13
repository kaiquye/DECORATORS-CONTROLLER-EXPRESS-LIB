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
  ValidateBody,
} from "./controllerDecoreitor.service";

import express from "express";
import { IsString } from "class-validator";

const server = express();

ControllerConfig(server);

export class userDto extends DtoBase {
  @IsString()
  name: string;

  constructor({ name }) {
    super();
    this.name = name;
  }
}
@Controller()
class Test extends ControllerBase {
  @ValidateBody(userDto)
  @Post("/tested")
  testsw(req, res) {
    res.send({});
    console.log("tested");
  }
}

server.listen(3002, () => console.log("runnig test"));

export {
  Controller,
  ControllerConfig,
  Get,
  Post,
  ValidateBody,
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
  ControllerBase,
};
