## Description
Spellchecker-cli is a simple tool to spellcheck a file

It gives you:

* commands to provide the file to be processed (`<spellchecker> --file <path_to_file_to_be_processed`).
* outputs wrongly spelled words with the line, paragraph and offset of that word in the file
* outputs a file with text with paragraphs with wrongly spelled words enclosed in '[' and ']'

```
  ____                   _   _          _                     _                  
 / ___|   _ __     ___  | | | |   ___  | |__     ___    ___  | | __   ___   _ __ 
 \___ \  | '_ \   / _ \ | | | |  / __| | '_ \   / _ \  / __| | |/ /  / _ \ | '__|
  ___) | | |_) | |  __/ | | | | | (__  | | | | |  __/ | (__  |   <  |  __/ | |   
 |____/  | .__/   \___| |_| |_|  \___| |_| |_|  \___|  \___| |_|\_\  \___| |_|   
         |_|                                                                     

Description: A simple tool to spellcheck a provided file...
Author: Daniel Carlson
Version: 1.0.0
License: MIT

Usage: -f <path_to_file>

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -f, --file     Your file to be processed                   [string] [required]
```

## Usage

### Development version:
* Change directory in to the root directory: `cd spellchecker-cli`
* Install all the dependencies: `yarn install`
* Run the tool
```bash
node index.js --file <path_to_file_to_be_processed>
```

### Installable version:

* Install the package globally using: `npm install --global rudimentary-spellchecker-cli`
* Run the tool
```bash
rudimentary-spellchecker-cli --file <path_to_file_to_be_processed>
```
### Dependencies

You should of course already have NodeJS installed, if not visit the [NodeJS Website](https://nodejs.org/en/) to install it

* [boxen]() for better styled outputs
* [chalk]() for styling text in the terminal
* [figlet]() display cool text in the terminal
* [yargs]() manage command line arguments

### Upcoming

* [ ] Make use of Typescript
* [ ] Add option to provide your own dictionary
* [ ] Add option to provide your own exceptions list
* [ ] Add option to provide path to your output file
* [ ] Add testing