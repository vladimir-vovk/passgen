import en from '../src/en'
const chalk = require('chalk')
const fs = require('fs')
const BadWords = require('bad-words')
const leoProfanityFilter = require('leo-profanity')

function main() {
  const rb = chalk.bold.redBright
  let count = 0
  const badWordsFilter = new BadWords()

  const output = process.argv[2] || 'src/en.ts'
  console.log(`🕹  Checking ${en.length} words ...`)

  const words = en.filter((word: string, i: number) => {
    if (i && i % 1000 === 0) {
      console.log(`  ... ${i} words done`)
    }

    // check with https://github.com/web-mech/badwords
    if (badWordsFilter.isProfane(word)) {
      console.log(`  ${rb(word)} removed (bad-words)`)
      count++
      return false
    }

    // check with https://github.com/jojoee/leo-profanity
    if (leoProfanityFilter.check(word)) {
      console.log(`  ${rb(word)} removed (leo-profanity)`)
      count++
      return false
    }

    return true
  })

  console.log('')

  if (!count) {
    console.log('🎉 All good!')
    return
  }

  if (fs.existsSync(output)) {
    const backup = `${output}.backup`
    fs.renameSync(output, backup)
    console.log(`⚠️  ${rb(output)} moved to ➡️ ${rb(backup)}`)
  }

  console.log('💾 Writing result to', rb(output), '...')
  fs.writeFileSync(
    output,
    `export default ${JSON.stringify(words, null, '  ')}`
  )

  console.log(`💚 Cleaned ${rb(count)} words!`)
}

main()
