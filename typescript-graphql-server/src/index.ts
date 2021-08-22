import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './entities/constants'
import mikroOrmConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello';

const main = async () => {
  const orm = await MikroORM.init(
    mikroOrmConfig
  )
  const migrator = orm.getMigrator()
  migrator.up()

  // Express server
  const app = express()

  // Apollo Server init
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    })
  })

  // Adding express server in apollo
  apolloServer.applyMiddleware({ app })

  // REST endpoint
  app.get('/', (_, res) => res.send('Hello from express server'))

  app.listen(4000, () => console.log('Express server started on PORT 4000'))

}

main().catch(err => console.log(err));