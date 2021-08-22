import 'reflect-metadata'
import { MikroORM } from '@mikro-orm/core'
import { PORT, __prod__ } from './constants'
import mikroOrmConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

const main = async () => {
  const orm = await MikroORM.init(
    mikroOrmConfig
  )
  await orm.getMigrator().up();

  // Express server
  const app = express()

  // Apollo Server init
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  })

  // Adding express server in apollo
  apolloServer.applyMiddleware({ app })

  // REST endpoint
  app.get('/', (_, res) => res.send('Hello from express server'))

  app.listen(PORT, () => console.log(`Express server started on PORT ${PORT}`))

}

main().catch(err => console.log(err));