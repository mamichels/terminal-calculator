import {Args} from '@oclif/core'
import {CalculationParser} from '../calculation/calculation-parser'
import {Calculator} from '../calculation/calculator'
import StdinCommand from './stdin-command'

export default class Calc extends StdinCommand {
  static description = 'Runs a given calculation'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {}

  static args = {
    calculation: Args.string({description: 'calculation to run'}),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(Calc)
    const calculationString = args.calculation

    if (!calculationString) {
      throw new Error('No calculation provided')
    }

    const calculation = new CalculationParser().parse(calculationString, Calc.stdin)
    const result = new Calculator().calculate(calculation)
    process.stdout.write(`${result}\n`)
  }
}
