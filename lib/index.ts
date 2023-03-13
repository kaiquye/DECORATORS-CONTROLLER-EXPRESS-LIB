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

ApplyDecorators.use(server);

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
  @Middleware("Test", () => console.log("middleware function"))
  @Post("/tested")
  testsw(req, res) {
    console.log("chegou aqui1");
  }
}

@Controller("/profile")
class Test2 extends ControllerBase {
  @Post("/tested")
  testsw(req, res) {
    console.log("chegou aqui2");
  }
}

const te = new Test();
console.log(te);

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
