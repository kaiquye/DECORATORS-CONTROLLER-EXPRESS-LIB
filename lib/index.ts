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

const server = express();

ControllerConfig(server);

export class userDto {
  name: string;
}
@Controller()
class Test extends ControllerBase {
  @ValidateDto(userDto)
  @Post("/tested")
  testsw(req, res) {
    res.send({});
    console.log("tested");
  }
}

server.listen(3001, () => console.log("runnig test"));

export {
  Controller,
  ControllerConfig,
  Get,
  Post,
  ValidateDto,
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
  ControllerBase,
};
