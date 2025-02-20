import { JwtPayload } from "jsonwebtoken";
import * as express from "express";

import { UserData } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: UserData;
    }
  }
}
