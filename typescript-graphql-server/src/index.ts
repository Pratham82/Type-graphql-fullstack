import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './entities/constants'
import { Post } from './entities/Post'
import mikroOrmConfig from './mikro-orm.config'

const main = async () => {
  const orm = await MikroORM.init(
    mikroOrmConfig
  )
  const migrator = orm.getMigrator()
  migrator.up()
  const post = orm.em.create(Post, { title: 'This is a test post' })
  await orm.em.persistAndFlush(post)
  // const allPosts = await orm.em.find(Post, {})
  // console.log(allPosts)

}

main().catch(err => console.log(err));