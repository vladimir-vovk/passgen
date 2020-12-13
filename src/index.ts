import { Command, flags } from '@oclif/command'
import chalk = require('chalk')

class Passgen extends Command {
  static description = 'Simple password 🔑 generator'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    length: flags.integer({
      char: 'L',
      description: 'password length',
      default: 16
    }),
    symbols: flags.string({
      char: 's',
      description: 'symbols to generate a password'
    }),
    'use-words': flags.boolean({
      char: 'w',
      description: 'use words to generate password',
      default: false
    }),
    'use-modified-words': flags.boolean({
      char: 'W',
      description: 'use modified words (e.g. b055, c@t, awe5ome)',
      default: false
    }),
    'use-emoji-with-words': flags.boolean({
      char: 'e',
      description: 'use emoji with words',
      default: false
    }),
    'no-lower-case': flags.boolean({
      char: 'l',
      description: 'no lower case letters',
      default: false
    }),
    'no-upper-case': flags.boolean({
      char: 'u',
      description: 'no upper case letters',
      default: false
    }),
    'no-characters': flags.boolean({
      char: 'c',
      description: 'no special characters',
      default: false
    }),
    'no-numbers': flags.boolean({
      char: 'n',
      description: 'no numbers',
      default: false
    })
  }

  // static args = [{ name: 'file' }]

  randomElement(array: string[]): string {
    const i = Math.floor(Math.random() * array.length)
    return array[i]
  }

  randomLength(w: string): number {
    return Math.floor(Math.random() * w.length)
  }

  replaceCharacter(ch: string): string {
    const chars: { [key: string]: string } = {
      l: '1',
      a: '@',
      o: '0',
      s: '5',
      e: '3',
      t: '7'
    }

    return chars[ch] || ch
  }

  modifyWord(word: string): string {
    let result = word
    for (let i = 0; i < this.randomLength(result); i++) {
      const j = this.randomLength(result)
      const letters = result.split('')

      letters[j] = this.replaceCharacter(letters[j].toLowerCase())

      if (letters[j] === letters[j].toUpperCase()) {
        letters[j] = letters[j].toLowerCase()
      } else {
        letters[j] = letters[j].toUpperCase()
      }

      result = letters.join('')
    }

    return result
  }

  async run() {
    const { args, flags } = this.parse(Passgen)

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const upper = alphabet.map((c: string) => c.toUpperCase())
    const characters = '@#$%-!?_+&^*='.split('')
    const numbers = '1234567890'.split('')

    const symbols: string[] = []
    if (flags.symbols) {
      symbols.push(...flags.symbols.split(''))
    } else {
      symbols.concat([...upper, ...characters, ...numbers])
      if (!flags['no-lower-case']) {
        symbols.push(...alphabet)
      }
      if (!flags['no-upper-case']) {
        symbols.push(...upper)
      }
      if (!flags['no-characters']) {
        symbols.push(...characters)
      }
      if (!flags['no-numbers']) {
        symbols.push(...numbers)
      }
    }

    let password = ''

    if (flags['use-words'] || flags['use-modified-words']) {
      const words = require('./en').default
      const delimiters = flags?.symbols?.split('') || characters
      const emoji = require('./emoji').default

      while (password.length < flags.length) {
        let word
        if (flags['use-emoji-with-words'] && Math.random() > 0.8) {
          word = this.randomElement(emoji)
        } else {
          word = this.randomElement(words)
          if (flags['use-modified-words']) {
            word = this.modifyWord(word)
          }
        }

        if (password) {
          password = `${password}${this.randomElement(delimiters)}${word}`
        } else {
          password = `${word}`
        }
      }
    } else {
      if (flags['use-emoji-with-words']) {
        const red = chalk.bold.redBright
        this.log(
          `  ⚠️  Use ${red('-e')} flag only with ${red('-w')} or ${red(
            '-W'
          )} flags`
        )
        this.log('')
      }
      password = Array.from({ length: flags.length })
        .map(_ => this.randomElement(symbols))
        .join('')
    }

    this.log(password)

    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from ./src/index.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}

export = Passgen
