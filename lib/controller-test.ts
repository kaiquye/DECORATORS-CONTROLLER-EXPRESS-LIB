import {
  Controller,
  ControllerBase,
  Post,
  Put,
} from "./controllerDecoreitor.service";

@Controller("/teste")
export class ControllerTest extends ControllerBase {
  @Put()
  async FunTest(req, res) {
    return res.send(req.body);
  }
}
