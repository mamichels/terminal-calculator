import {Operation} from './operation'

export interface Calculation {
  readonly operation: Operation;
  readonly value: number;
  readonly otherValue: number;
}
