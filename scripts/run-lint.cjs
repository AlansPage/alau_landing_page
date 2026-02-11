const path = require("node:path")
const { spawnSync } = require("node:child_process")

const repoRoot = path.resolve(__dirname, "..")
let eslintBin = null
try {
  eslintBin = require.resolve("eslint/bin/eslint.js", { paths: [repoRoot] })
} catch {
  // eslint not available
}

if (!eslintBin) {
  console.log("Lint skipped: ESLint is not installed in this repo.")
  process.exit(0)
}

const result = spawnSync(process.execPath, [eslintBin, "."], {
  stdio: "inherit",
  cwd: repoRoot,
})
process.exit(result.status ?? 1)
