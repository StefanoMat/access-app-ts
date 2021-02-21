import { createConnection, Connection } from 'typeorm'

export const PostegresHelper = {
  client: null as Connection,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await createConnection({
      type: 'postgres',
      url: uri
    })
  }
}
