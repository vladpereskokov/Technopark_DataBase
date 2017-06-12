import userService from '../services/userService';

class UserController {
  create(ctx, next) {
    return new Promise(async (resolve, reject) => {
      const body = ctx.request.body;
      body.nickname = ctx.params.nickname;

      userService.dataBase.task(async (task) => {

        // delete try
        try {
          await userService.create(body, task);

          ctx.body = body;
          ctx.status = 201;

          resolve();
        } catch(error) {
          ctx.body = await userService.getUser(body.nickname, body.email, task);
          ctx.status = 409;

          resolve();
        }
      });
    });
  }

  get(ctx, next) {
    return new Promise(async (resolve, reject) => {
      const user = await userService.getUserByNickname(ctx.params.nickname);

      ctx.body = user;
      ctx.status = user ? 200 : 404;

      resolve();
    });
  }

  update(ctx, next) {
    return new Promise(async (resolve, reject) => {
      const body = ctx.request.body;
      body.nickname = ctx.params.nickname;

      userService.dataBase.task(async (task) => {
        const errors = await userService.checkErrors(body.nickname, body.email, task);

        console.log(errors);

        if (errors.notfound) {
          ctx.body = null;
          ctx.status = 404;

          resolve();
          return;
        } else if (errors.conflict) {
          ctx.body = null;
          ctx.status = 409;

          resolve();
          return;
        }

        ctx.body = await userService.update(body, task);
        ctx.status = 200;

        resolve();
      });
    });
  }
}

const userController = new UserController();
export default userController;
