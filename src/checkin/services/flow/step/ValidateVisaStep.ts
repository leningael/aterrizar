import { Builder } from 'builder-pattern'
import { Context } from '../../../model/Context'
import { Session } from '../../../model/session'
import { FlightData } from '../../../model/session/FlightData'
import StepTemplate from '../StepTemplate'
import { UserInformation } from '../../../model/session/UserInformation'
import { RequestData } from '@http/Request'

export default class ValidateVisaStep extends StepTemplate {
  private readonly COUNTRY_REQUIRE_VISA = 'US'
  private readonly VISA_WAIVER_COUNTRIES: string[] = ['AD', 'AU', 'AT', 'BE', 'BN', 'CL', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'JP', 'LV', 'LI', 'LT', 'LU', 'MT', 'MC', 'NL', 'NZ', 'NO', 'PL', 'PT', 'SM', 'SG', 'SK', 'SI', 'KR', 'ES', 'SE', 'CH', 'TW', 'GB', 'US']

  onExecute(context: Context): Promise<boolean> {
    const session: Session = context.getSession()
    const requestData = context.getRequest()
    if (requestData.fields?.visa_number == null) {
      context = requestVisaFieldInResponse(context)
      return Promise.resolve(false)
    }
    context = saveVisaInSession(context, session, requestData)
    return Promise.resolve(true)
  }

  when(context: Context): boolean {
    const session: Session = context.getSession()
    const flights: FlightData[] = session.data.flights
    const isFliyingToUS: boolean = flights.some((flight) => flight.to.country === this.COUNTRY_REQUIRE_VISA)
    const isFromVisaWaiverCountry: boolean = this.VISA_WAIVER_COUNTRIES.includes(session.data.country)
    const isVisaRegistered: boolean = session.userInformation.visaNo !== undefined
    return isFliyingToUS && !isFromVisaWaiverCountry && !isVisaRegistered
  }
}

function requestVisaFieldInResponse(context: Context): Context {
  context = context.withResponseBuilder((responseBuilder) => responseBuilder
    .status('user_information_required')
    .requiredFiles({ visa_number: null })
  )
  return context
}

function saveVisaInSession(context: Context, session: Session, requestData: RequestData): Context {
  context = context.withSessionBuilder((sessionBuilder) => sessionBuilder
    .userInformation(
      Builder<UserInformation>(session.userInformation)
        .visaNo((requestData.fields?.visa_number as string))
        .build()
    )
  )
  return context
}
