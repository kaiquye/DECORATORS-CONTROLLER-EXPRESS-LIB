class error extends Error {
  constructor(message) {
    super(message);
    this.name = "[decorator-controller-error]";
  }
}

export const GlobalError = (message?: string) => {
  if (!message) {
    throw new error("unexpected error lib decorator controller");
  }
  throw new error(message);
};
