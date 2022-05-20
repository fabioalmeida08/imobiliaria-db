import * as express from 'express'

export declare global {
  namespace Express {
    interface Request {
      id_realtor: string
      id_agency: string
      firebaseUrl: string
    }
  }
}
