import {Command} from '@oclif/core'

const read = async (stream: NodeJS.ReadStream) => {
  const chunks: Uint8Array[] = []
  for await (const chunk of stream) chunks.push(chunk as Uint8Array)
  return Buffer.concat(chunks).toString('utf8')
}

export default abstract class StdinCommand extends Command {
  static stdin: string

  async init(): Promise<void> {
    StdinCommand.stdin = await read(process.stdin)
  }
}
