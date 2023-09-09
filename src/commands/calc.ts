import {Args, Command} from '@oclif/core'
import {CalculationParser} from '../calculation/calculation-parser'
import {Calculator} from '../calculation/calculator'

export default class Calc extends Command {
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

    const calculation = new CalculationParser().parse(calculationString)
    console.log(calculation)
    const result = new Calculator().calculate(calculation)
    console.log(result)
  }
}
