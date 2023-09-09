import {Calculation} from './calculation'
import {Operation} from './operation'

export class CalculationParser {

  /**
   * Given a user input string, parse it into a Calculation object.
   * E.g. "1 + 2" => Calculation(Operation.Add, 1, 2)
   * E.g. "1-2" => Calculation(Operation.Subtract, 1, 2)
   *
   * @param {string} calculationString The user input string
   * @param {string} placeholderValue The value to replace an optional placeholder with
   * @returns {Calculation} The parsed calculation
   */
  public parse(calculationString: string, placeholderValue?: string): Calculation {
    if (placeholderValue) {
      calculationString = calculationString.replace('%', placeholderValue)
    }

    const [value, operation, otherValue] = this._splitCalculationString(calculationString)
    return {
      operation: this._parseOperation(operation),
      value: this._parseValue(value),
      otherValue: this._parseValue(otherValue),
    }
  }

  private _splitCalculationString(calculationString: string) {
    const operation = this._findOperation(calculationString)
    const value = calculationString.slice(0, operation.index)
    const otherValue = calculationString.slice(operation.index + 1)
    return [value, operation.operation, otherValue]
  }

  private _findOperation(calculationString: string) {
    const addIndex = calculationString.indexOf(Operation.Add)
    const subtractIndex = calculationString.indexOf(Operation.Subtract)
    const multiplyIndex = calculationString.indexOf(Operation.Multiply)

    const indices = [addIndex, subtractIndex, multiplyIndex].filter(index => index !== -1)

    if (indices.length === 0) {
      throw new Error(`No supported operation found in calculation string: ${calculationString}`)
    }

    if (indices.length > 1) {
      throw new Error(`Multiple operations found in calculation string: ${calculationString}`)
    }

    const index = indices[0]
    const operation = calculationString[index]
    return {index, operation}
  }

  private _parseOperation(operation: string): Operation {
    switch (operation) {
    case '+':
      return Operation.Add
    case '-':
      return Operation.Subtract
    case '*':
      return Operation.Multiply
    default:
      throw new Error(`Unknown operation: ${operation}`)
    }
  }

  private _parseValue(value: string): number {
    return Number(value)
  }
}
