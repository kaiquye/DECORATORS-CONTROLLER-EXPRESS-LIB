import {
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  IHttpResponse,
} from "./validationObjectTransfer.service";
import {
  Controller,
  ControllerBase,
  ApplyDecorators,
  Get,
  Post,
  ValidateBody,
  ValidateParam,
  ValidateQuery,
} from "./controllerDecoreitor.service";

import express from "express";
import { IsEmail, IsString } from "class-validator";

const server = express();
server.use(express.json());

ApplyDecorators.toServer(server);

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
  @ValidateQuery(paramDto)
  @ValidateBody(userDto)
  @Post("/tested/")
  testsw(req, res) {
    console.log("chegou aqui");
    res.send(req.body);
  }
}

server.listen(3002, () => console.log("runnig test"));

export {
  Controller,
  Get,
  Post,
  ValidateBody,
  DtoBase,
  ValidationObject,
  ControllerAdapter,
  ApplyDecorators,
  IHttpResponse,
  ControllerBase,
};
