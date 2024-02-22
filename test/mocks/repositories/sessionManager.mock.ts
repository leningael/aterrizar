import generateSessionMock from '@testMocks/model/Session.mock'
import { Session } from '../../../src/checkin/model/session'
import { SessionManager } from '../../../src/checkin/services/sessionManager'
import generateMapRequestToSessionMock from './mapRequestToSession.mock'

const generateSessionManagerMock = (
  session: Session = generateSessionMock()
): SessionManager => ({
  getSession: jest.fn().mockResolvedValue(session),
  saveSession: jest.fn().mockResolvedValue(session),
  mapInitRequestToSession: generateMapRequestToSessionMock(session)
})

export default generateSessionManagerMock
