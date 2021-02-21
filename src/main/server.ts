import { PostegresHelper } from '../infra/db/postgres/helpers/postegres-helper'
import dotenv from 'dotenv'
dotenv.config()
PostegresHelper.connect(process.env.POSTGRES_URL)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(process.env.port, () => console.log(`Server running on ${process.env.port}`))
  })
  .catch(console.error)
