import { Post } from "./entities/Post";
import { __prod__ } from "./entities/constants";
import { MikroORM } from "@mikro-orm/core";
import * as path from 'path'

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [Post],
    user: 'pratham82',
    password: 'rootedpirate',
    dbName: 'lireddit',
    type: 'postgresql',
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0]
