export class RouteNotFound extends Error {
  constructor(path: string) {
    super('Route Not Found')
    this.message = `path: ${path}`
  }
}
