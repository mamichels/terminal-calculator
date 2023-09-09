import {expect, test} from '@oclif/test'

describe('calc', () => {

  test
    .stdout()
    .command(['calc', '1 + 1'])
    .it('runs addition', ctx => {
      expect(ctx.stdout).to.contain('2')
    });

  test
    .stdout()
    .command(['calc', '1 + 1'])
    .it('runs addition', ctx => {
      expect(ctx.stdout).to.contain('2')
    });

  test
    .stdout()
    .command(['calc', '2 - 1'])
    .it('runs subtraction', ctx => {
      expect(ctx.stdout).to.contain('1')
    });

  test
    .stdout()
    .command(['calc', '2 / 3'])
    .catch(error => expect(error.message).to.contain('No supported operation found in calculation string: 2 / 3'))
    .it('runs no supported operation');

})
