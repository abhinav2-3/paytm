export class handleError extends Error {
  constructor(message = "Refresh the Page") {
    super(message), (this.name = "handleError");
  }
}
