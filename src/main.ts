import {NestFactory} from '@nestjs/core';
import {AppModule} from './App.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'

const sqlite3 = require("sqlite3").verbose()

import {PromisedDatabase} from './sqllite'

async function bootstrap() {
  const appOptions = {
    // cors: {
    //   origin: 'http://localhost:8000',
    //   credentials: true,
    // }
  }

  const path = require('path');
  let rootPath = path.resolve(__dirname, '../_db');
  let sqliteDbPath = `${rootPath}/data.db`

  const db = new PromisedDatabase(); // create a instance of PromisedDatabase

  await db.open(sqliteDbPath)

  await db.run(`insert into user values(3,"李四")`)

  const rows = await db.all(`select * from user`)

  console.log('all查询结果 ', rows)
  console.log('转换JSON', JSON.stringify(rows));//all所有的内容转成 JSON内容


  const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);
  //app.setGlobalPrefix('api')
  app.useStaticAssets(path.join(__dirname, '../_assets/'), {
    prefix: '/',
  })


  const whitelist = ['localhost', 'mybricks.world'];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.find(item => origin.indexOf(item) >= 0)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
  })

  app.use(cookieParser())

  await app.listen(3001)
}

bootstrap()