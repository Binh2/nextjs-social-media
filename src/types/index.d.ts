export {};

declare global {
  namespace Express {
    interface Request {
      body: {
        content: string,
        image: string,  
      }
    }
  }
}