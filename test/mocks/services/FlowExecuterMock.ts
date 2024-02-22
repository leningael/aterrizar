import { MockContext } from '@testMocks/model/Context.mock'
import { Context } from '../../../src/checkin/model/Context'
import FlowExecuter from '../../../src/checkin/services/flow/FlowExecuter'

export default class FlowExecuterMock extends FlowExecuter {

  private readonly stepsExecution: string[] = []

  constructor(
    private readonly contextMock: Context = new MockContext()
  ) {
    super()
  }

  async execute(): Promise<Context> {
    for (const step of this.steps) {
      this.stepsExecution.push(step.constructor.name)
    }
    return this.contextMock
  }

  getStepsExecution(): string[] {
    return this.stepsExecution
  }
}
