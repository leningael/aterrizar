import { RequestData } from '@http/Request'
import { Session } from '../model/session'

export type ISaveSessionRepository = (session: Session, ttl: number) => Promise<void>
export type IGetSessionRepository = (sessionId: string) => Promise<Session | null>
export type IMapRequestToSession = (requestData: RequestData) => Promise<Session>
