import generateSessionMock from '@testMocks/model/Session.mock'
import { IMapRequestToSession } from '../../../src/checkin/interfaces/ISessionRepository'
import { Session } from '../../../src/checkin/model/session'

const generateMapRequestToSessionMock =
  (session: Session = generateSessionMock()): IMapRequestToSession => jest.fn(
    (): Promise<Session> => Promise.resolve(session)
  )

export default generateMapRequestToSessionMock
