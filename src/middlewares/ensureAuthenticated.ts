import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(
      token,
      "286b2409fdcc28f10e7227fde9836d4f"
    ) as IPayload;

    request.user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
