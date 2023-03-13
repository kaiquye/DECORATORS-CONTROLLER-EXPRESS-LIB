let globalConfig = {
  instanceApp: null,
};
const applyControllerDecorator = (app) => {};

const applyDecoratorsControllers = (instance, controllers: Function[]) => {
  if (globalConfig.instanceApp) {
    throw new Error("invalid instance");
  }

  globalConfig.instanceApp = instance;
  for (const controller of controllers) {
    globalConfig.instanceApp.use(controller.prototype._router);
  }

  return globalConfig.instanceApp;
};

export { applyDecoratorsControllers, applyControllerDecorator };
