import {Calculation} from './calculation'
import {Operation} from './operation'

export class Calculator {
  public calculate(calculation: Calculation): number {
    switch (calculation.operation) {
    case Operation.Add:
      return calculation.value + calculation.otherValue
    case Operation.Subtract:
      return calculation.value - calculation.otherValue
    case Operation.Multiply:
      return calculation.value * calculation.otherValue
    default:
      throw new Error(`Unknown operation ${calculation.operation}`)
    }
  }
}
