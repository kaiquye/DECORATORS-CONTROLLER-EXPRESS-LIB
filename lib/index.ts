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
  ValidateParam,
} from "./controllerDecoreitor.service";

import express from "express";
import { IsEmail, IsString } from "class-validator";

const server = express();
server.use(express.json());

ControllerConfig(server);

export class userDto extends DtoBase {
  @IsString()
  name: string;

  constructor({ name }) {
    super();
    this.name = name;
  }
}

export class paramDto extends DtoBase {
  @IsEmail()
  email: string;
  constructor({ email }) {
    super();
    this.email = email;
  }
}
@Controller()
class Test extends ControllerBase {
  @ValidateParam(paramDto)
  @ValidateBody(userDto)
  @Post("/tested/:name")
  testsw(req, res) {
    console.log("chegou aqui");
    res.send(req.body);
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
