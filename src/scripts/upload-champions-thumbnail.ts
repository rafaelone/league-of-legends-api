import axios from 'axios'
import fs from 'fs'
import * as Minio from 'minio'
import path from 'path'

import ChampionThumbnail from '@/jsons/champion-thumbnail.json'

type ChampionThumbnail = {
  name: string
  thumbnail: string
}

const client = new Minio.Client({
  endPoint: process.env.IP_ADDRESS ?? '',
  port: 9000,
  useSSL: false,
  accessKey: process.env.ACCESS_KEY_S3 ?? '',
  secretKey: process.env.ACCESS_SECRET_KEY_S3 ?? '',
})

async function uploadChampionsThumbnailToS3(
  champions: ChampionThumbnail[],
  index: number,
) {
  if (index === champions.length) {
    return
  }

  const filePath = path.join('./scripts', champions[index].name)
  const response = await axios({
    url: champions[index].thumbnail,
    method: 'GET',
    responseType: 'stream',
  })

  const writer = fs.createWriteStream(filePath)
  await response.data.pipe(writer)

  const bucketName = 'champions'
  const objectName = champions[index].name

  const filePathThumbnail = path.resolve(
    __dirname,
    `./${champions[index].name}`,
  )
  const metaData = {
    'Content-Type': 'image/jpg',
  }

  await new Promise((resolve, reject) => {
    writer.on('finish', resolve) // Quando o stream terminar, resolve a Promise
    writer.on('error', reject) // Caso ocorra um erro, rejeita a Promise
  })

  await client.fPutObject(bucketName, objectName, filePathThumbnail, metaData)

  await new Promise((resolve) => {
    fs.unlink(filePathThumbnail, (err) => {
      if (err) {
        console.log(err)
      }
      resolve('deleted')
    })
  })

  await uploadChampionsThumbnailToS3(champions, index + 1)
}

uploadChampionsThumbnailToS3(ChampionThumbnail, 0)
