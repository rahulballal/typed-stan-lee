import { DataAccess } from '../data-access'

export interface IContext {
  dao: DataAccess
  req?: Express.Request
  res?: Express.Response
}
