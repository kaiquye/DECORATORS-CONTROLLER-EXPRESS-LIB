
<p align="center" >
Decorators-Controller-Express
</p>

<p align="center" >
   <img width= 150 src='https://www.publicdomainpictures.net/pictures/340000/nahled/dog-silhouette-logo.png'/>
</p>


### Install 
```js
npm i decorators-controller-express
```


## Simple example

Start express

```typescript
import express from "express";

const app = express();
ApplyDecorators.toServer(server);
```

#### Create your dto


```ts
// DTO BODY
import { IsEmail, IsString } from "class-validator";

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
    @Get("/find/user_id")
    findUserById(req, res) {
        res.send(req.body);
    }
}
```  

