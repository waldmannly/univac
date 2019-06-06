import { Options, languages } from '../types';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { parseAst } from '../parseAst';

interface CliOptions extends Options {
  help?:boolean
  listLanguages?: boolean
}

export function cliMain(o: Options){
  preconditions(o)
  let input = existsSync(o.input) ? readFileSync(o.input).toString() : o.input
  const result = parseAst({...o, input})
  const text = o.outputStyle==='json' ? JSON.stringify(result, null, 2) : JSON.stringify(result)
  if(o.output){
    writeFileSync(o.output, text)
  }
  else {
    process.stdout.write(text)
  }
}

function preconditions(options: CliOptions) {
  if (options.output) {
    options.output = (options.output as any).split(',') as any
  }
  if (options.help) {
    printHelp();
    process.exit(0);
  }
  if (!options.language||!options.input) {
    fail(`--language and --input are mandatory but one was not given. Aborting.`);
  }
  if(!languages.includes(options.language)){
    fail(`Unknown language "${options.language}".
${listLanguages()}
Aborting.`);
  }
  if(options.listLanguages) {
    process.stdout.write(listLanguages())
    process.exit(0)
  }
}

function listLanguages(): string | Buffer | Uint8Array {
  return `
Supported Languages: 
${languages.join(', ')}
`;
}

function fail(s: string) {
  console.error(s);
  process.exit(1);
}

function printHelp() {
  console.log(`
Usage: 

univac --language python3 --input src/main.py --output main.py.ast

Options:
  `)
}
