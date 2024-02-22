import { Router } from 'express'
import { RequestData } from './model/Request'
import sessionManager from '../checkin/services/sessionManager'
import CheckinFlow from '../checkin/services/CheckInFlow'
import FlowExecuter from '../checkin/services/flow/FlowExecuter'

const CheckInRouter = Router()

CheckInRouter.post('/init', (httpRequest, httpResponse) => {
  const body: RequestData = httpRequest.body as RequestData
  new CheckinFlow(sessionManager).init(body)
    .then((response) => httpResponse.send(response))
    .catch((e) => {
      console.error(e)
      httpResponse.status(501).send('not working')
    })
})

CheckInRouter.post('/continue', (httpRequest, httpResponse) => {
  const body: RequestData = httpRequest.body as RequestData
  new CheckinFlow(sessionManager).checkIn(new FlowExecuter(), body)
    .then((response) => httpResponse.send(response))
    .catch((e) => {
      console.error(e)
      httpResponse.status(501).send('not working')
    })
})

CheckInRouter.get('/ping', (_, httpResponse) => {
  httpResponse.send('pong')
})

export default CheckInRouter
