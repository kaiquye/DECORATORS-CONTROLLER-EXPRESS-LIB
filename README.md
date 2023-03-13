
<p align="center" >
Decorators-Controller-Express
</p>

<p align="center" >
   <img width= 150 src='https://www.publicdomainpictures.net/pictures/340000/nahled/dog-silhouette-logo.png'/>
</p>


### Install 
decorators
```js
npm i decorators-controller-express
```
class-validator
```
npm i class-validator
```


## Simple example

Start express

```typescript
import express from "express";

const app = express();

ApplyDecorators.toServer(app);

app.listen(3000, console.log("start project."))
```

#### Create your dto


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

```ts
// CONTROLLER
import UserDto from "./dto/user-dto.ts";
import { ControllerBase, Post, ValidateBody } from "decorators-controller-express";

@Controller()
class UserController extends ControllerBase {
    
    @ValidateBody(userDto)
    @Post("/login")
    login(req, res) {
        res.send(req.body);
    }

    @ValidateParam(findUserDto)
    @Get("/find/:user_id")
    findUserById(req, res) {
        res.send(req.body);
    }
}
```  

