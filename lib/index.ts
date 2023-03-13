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
  GlobalMiddleware,
  Middleware,
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
@Controller("/user")
@GlobalMiddleware([(rq, rs, nx) => nx()])
class Test extends ControllerBase {
  @Post("")
  @Middleware(() => console.log("middleware function"))
  testsw(req, res) {
    console.log("chegou aqui");
  }
}

@Controller("/profile")
class Test2 extends ControllerBase {
  @Get()
  testsw(req, res) {
    console.log("chegou aqui");
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
