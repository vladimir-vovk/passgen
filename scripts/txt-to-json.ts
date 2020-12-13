const fs = require('fs')

function main() {
  const input = process.argv[2]
  const output = process.argv[3]

  if (!input) {
    console.log('⚠️  Please provide input file as a first argument.')
    console.log('')
    process.exitCode = 1
    return 0
  }

  if (!output) {
    console.log('⚠️  Please provide output file as a second argument.')
    console.log('')
    process.exitCode = 1
    return 0
  }

  console.log('🏗  Processing ', input, '...')

  let data
  try {
    data = fs.readFileSync(input, 'utf8')
  } catch (err) {
    console.log('Error:', err)
  }

  const words = data.split('\n').filter((word: string) => {
    if (!word) {
      return false
    }

    // skip words starting with capital letter
    if (word[0] === word[0].toUpperCase()) {
      return false
    }

    // skip words ending with 's
    if (word.slice(-2) === `'s`) {
      return false
    }

    return true
  })

  console.log('💾 Writing data to', output, '...')
  try {
    fs.writeFileSync(output, JSON.stringify(words, null, '  '))
  } catch (err) {
    console.log('Error:', err)
  }
}

main()
