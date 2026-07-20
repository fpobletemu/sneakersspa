import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const imageDir = path.join(projectRoot, 'img')

const imageRules = {
  'before-after-hero.png': {
    width: 1600,
    quality: 82,
  },
  'before-after-pair.png': {
    width: 1200,
    quality: 82,
  },
  'logo-primary.png': {
    width: 1200,
    quality: 92,
  },
  'logo-tagline.png': {
    width: 900,
    quality: 92,
    trim: true,
  },
  'logo-wordmark.png': {
    width: 900,
    quality: 92,
    trim: true,
  },
}

const optimizeImage = async (fileName, options) => {
  const inputPath = path.join(imageDir, fileName)
  const outputPath = path.join(imageDir, fileName.replace(/\.png$/i, '.webp'))

  let pipeline = sharp(inputPath)

  if (options.trim) {
    pipeline = pipeline.trim()
  }

  await pipeline
    .resize({
      width: options.width,
      withoutEnlargement: true,
    })
    .webp({
      quality: options.quality,
      effort: 6,
    })
    .toFile(outputPath)

  return outputPath
}

const main = async () => {
  await mkdir(imageDir, { recursive: true })
  const files = await readdir(imageDir)
  const candidates = files.filter((file) => file.toLowerCase().endsWith('.png'))

  for (const fileName of candidates) {
    const options = imageRules[fileName]

    if (!options) {
      continue
    }

    const outputPath = await optimizeImage(fileName, options)
    console.log(`optimized: ${path.relative(projectRoot, outputPath)}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})