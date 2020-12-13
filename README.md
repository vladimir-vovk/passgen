🔑 passgen 🔒
============

Simple password generator

<img src="./screen.gif" width="300"></img>

# Installation

You could install it globally with `yarn`

```
yarn global add @vladimir-vovk/passgen
```

or `npm`

```
npm install -g @vladimir-vovk/passgen
```

Or run it with `npx`

```
npx @vladimir-vovk/passgen
```

# Usage

```
USAGE
  $ passgen

OPTIONS
  -L, --length=length         [default: 16] password length
  -W, --use-modified-words    use modified words (e.g. b055, c@t, awe5ome)
  -c, --no-characters         no special characters
  -e, --use-emoji-with-words  use emoji with words
  -h, --help                  show CLI help
  -l, --no-lower-case         no lower case letters
  -n, --no-numbers            no numbers
  -s, --symbols=symbols       symbols to generate a password
  -u, --no-upper-case         no upper case letters
  -v, --version               show CLI version
  -w, --use-words             use words to generate password
```
