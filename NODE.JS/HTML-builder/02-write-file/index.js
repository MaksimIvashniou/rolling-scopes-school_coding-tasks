const { createWriteStream } = require('fs');
const { resolve } = require('path');
const { stdin, stdout, exit } = require('process');
const { createInterface } = require('readline');

const config = {
  src: resolve(__dirname, 'text.txt'),
};

const MESSAGES = {
  prompt: 'Enter some text: (Enter "exit" or press "ctrl + c" to end task)\n',
  exit: 'Goodbye!\n',
  input: '> ',
};

const COLORS = {
  white: '\x1b[0m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function colorizeMessage(msg, colors) {
  const { target = COLORS.white, reset = COLORS.white } = colors;
  return `${target}${msg}${reset}`;
}

function writeFile(targetFilePath) {
  const writeStream = createWriteStream(targetFilePath, { flags: 'a' });

  const rl = createInterface({
    input: stdin,
    output: stdout,
  });

  rl.setPrompt(colorizeMessage(MESSAGES.input, { target: COLORS.yellow }));

  stdout.write(colorizeMessage(MESSAGES.prompt, { target: COLORS.cyan }));
  handleInput();

  function handleInput() {
    rl.prompt();
  }

  function handleExit() {
    stdout.write(colorizeMessage(MESSAGES.exit, { target: COLORS.cyan }));
    writeStream.end();
    rl.close();
    exit();
  }

  rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'exit') {
      handleExit();
      return;
    }

    writeStream.write(`${input}\n`);
    handleInput();
  });

  rl.on('SIGINT', () => {
    stdout.write('\n');
    handleExit();
  });
}

writeFile(config.src);
