import { DtoBase } from "./validationObjectTransfer.service";
import { IsEmail, IsString } from "class-validator";
import {
  Controller,
  ControllerBase,
  GlobalMiddleware,
  Middleware,
  Post,
} from "./controllerDecoreitor.service";
import { Router } from "express";
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
export class Test extends ControllerBase {
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
