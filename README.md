

<img width= 150 src='https://www.publicdomainpictures.net/pictures/340000/nahled/dog-silhouette-logo.png'/>

### Decorators-Controller-Express 

#
#### Author: https://github.com/kaiquye
#
### Install 

```js
npm i decorators-controller-express
```


## Start configuration with express

```typescript
import express from "express";
import { applyDecoratorsControllers } from "decorators-controller-express";
import { UserController } from "./src/modules/controller";

const server = express();
server.use(express.json())

const app = applyDecoratorsControllers(server, [UserController, ProfileController, ...others]);

app.listen(3000, console.log("Bomb Has Been Planted..."))
```

## Example: Simple  Controller

#### Create your Controller
your class must extend from the ```ControllerBase``` 
```ts
// CONTROLLER
import UserDto from "./dto/user-dto.ts";
import { ControllerBase, Post, ValidateBody } from "decorators-controller-express";

@Controller("/v1/user")
class UserController extends ControllerBase {
    
    @Post("/login")
    login(req, res) {
        res.send(req.body);
    }
}
```  


### Add Middleware

#### Global Middleware
Use ``@GlobalMiddleware`` decorator to add middleware to your class

your class must extend from the ```ControllerBase```
```ts
// CONTROLLER
import UserDto from "./dto/user-dto.ts";
import { ControllerBase, Post, ValidateBody } from "decorators-controller-express";

@Controller("/v1/user")
@GlobalMiddleware([AuthMiddlewareExample])
class UserController extends ControllerBase {
    
    @Post("/login")
    login(req, res) {
        res.send(req.body);
    }
}
```  

#### Middleware for router
Use ``@Middleware`` decorator to add middleware to your route
- Your class must extend from the ```ControllerBase```
```ts
// CONTROLLER
import UserDto from "./dto/user-dto.ts";
import { ControllerBase, Post, ValidateBody } from "decorators-controller-express";

@Controller("/v1/user")
class UserController extends ControllerBase {
    
    @Middleware(VerifyStoreMiddlewareExample)
    @Post("/login")
    login(req, res) {
        res.send(req.body);
    }
}
```  

### Validate request ``Body``

class-validator
```
npm i class-validator
```

#### Create your dto
your class must extend from the base ```DtoBase```

```ts
// DTO BODY
import { IsEmail, IsString } from "class-validator";
import { DtoBase } from "decorators-controller-express";
export class UserDto extends DtoBase {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    
    constructor({ email, password }) {
        super();
        this.email = email;
        this.password = password;
    }
}
```
#### Create your Controller
you must call the ``@ValidateBody()`` decorator and pass your DTO as a parameter

- your class must extend from the ```ControllerBase```
```ts
// CONTROLLER
import UserDto from "./dto/user-dto.ts";
import { ControllerBase, Post, ValidateBody } from "decorators-controller-express";

@Controller("/v1/user")
class UserController extends ControllerBase {
    
    @ValidateBody(UserDto)
    @ValidateParam(searchDto)
    @Post("/login")
    login(req, res) {
        res.send(req.body);
    }
}
```  

### Validate request ``Params``

#### Create your Controller
you must call the ``@ValidateParam()`` decorator and pass your DTO as a parameter

- your class must extend from the ```ControllerBase```
```ts
// CONTROLLER
import UserDto from "./dto/user-dto.ts";
import { ControllerBase, Post, ValidateBody } from "decorators-controller-express";

@Controller("/v1/user")
class UserController extends ControllerBase {
    
    @ValidateParam(UserDto)
    @Get("/:user_id")
    login(req, res) {
        res.send(req.body);
    }
}
```  


### Validate request ``Query``

#### Create your Controller
you must call the ``@ValidateQuery()`` decorator and pass your DTO as a parameter

- your class must extend from the ```ControllerBase```
```ts
// CONTROLLER
import UserDto from "./dto/user-dto.ts";
import { ControllerBase, Post, ValidateBody } from "decorators-controller-express";

@Controller("/v1/user")
class UserController extends ControllerBase {
    
    @ValidateQuery(UserDto)
    @Get("/")
    findAll(req, res) {
        res.send(req.body);
    }
}
```  