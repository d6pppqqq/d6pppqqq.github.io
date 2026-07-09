import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const source = join(root, '..', 'logo图', 'ChatGPT Image 2026年6月24日 01_31_24.png')
const outDir = join(root, 'public', 'characters')
const tmpDir = join(root, '.tmp-character-assets')

const assets = [
  { id: 'workspace', crop: [50, 83, 638, 510], output: 960 },
  { id: 'gaming', crop: [703, 57, 418, 279], output: 720 },
  { id: 'styling', crop: [736, 350, 420, 275], output: 720 },
  { id: 'table-tennis', crop: [30, 646, 324, 246], output: 560 },
  { id: 'fitness', crop: [378, 643, 260, 248], output: 520 },
  { id: 'camera', crop: [659, 665, 245, 229], output: 500 },
  { id: 'coding', crop: [929, 681, 291, 218], output: 560 },
  { id: 'thinking', crop: [344, 960, 124, 172], output: 300 },
  { id: 'laptop', crop: [506, 961, 142, 174], output: 320 },
  { id: 'coffee', crop: [674, 965, 128, 166], output: 300 },
  { id: 'music', crop: [823, 945, 152, 187], output: 330 },
  { id: 'resting', crop: [1027, 936, 164, 202], output: 330 },
]

mkdirSync(outDir, { recursive: true })
rmSync(tmpDir, { recursive: true, force: true })
mkdirSync(tmpDir, { recursive: true })

for (const asset of assets) {
  const [x, y, w, h] = asset.crop
  const out = join(outDir, `${asset.id}.png`)

  execFileSync('ffmpeg', [
    '-y',
    '-i',
    source,
    '-vf',
    `crop=${w}:${h}:${x}:${y},format=rgba,colorkey=0xffffff:0.045:0.02,scale=${asset.output}:-1:flags=neighbor,pad=ceil(iw*1.08/2)*2:ceil(ih*1.1/2)*2:(ow-iw)/2:(oh-ih)/2:color=0x00000000`,
    '-frames:v',
    '1',
    out,
  ], { stdio: 'ignore' })

  console.log(`generated public/characters/${asset.id}.png`)
}

rmSync(tmpDir, { recursive: true, force: true })
