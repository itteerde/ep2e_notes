import { parseArgs } from 'util';
import fs from 'fs';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { World } from './model/World.mjs';

const args = ['-f', '--bar', 'b'];
const options = {
    foo: {
        type: 'boolean',
        short: 'f',
    },
    bar: {
        type: 'string',
    },
};
const {
    values,
    positionals,
} = parseArgs({ args, options });
//console.log(values, positionals);

let world = undefined;

if (process.argv.find(a => a.startsWith("--init"))) {
    world = new World({ name: 'Campaign #1' });
} else {
    world = JSON.parse(fs.readFileSync('world.json', 'utf8'));

}

function saveWorld() {
    fs.writeFileSync('world.json', JSON.stringify(world));
}

const rl = readline.createInterface({ input, output });

do {
    var answer = await rl.question('> ');
    if (answer === '.exit') {
        break;
    }
    if (answer === '.save') {
        saveWorld();
        continue;
    }
    try {
        console.log(eval(answer));
    } catch (e) {
        console.error(e);
        console.log("\n.exit to close CLI.");
    }
} while (true);

rl.close();
process.exit();
