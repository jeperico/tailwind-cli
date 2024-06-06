#!/usr/bin/env node

const chokidar = require('chokidar');
const { exec } = require('child_process');

function runCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('[ERROR-00]: ' + error.message);
            return;
        }
        if (stderr) {
            console.error('[STDERR]: ' + stderr);
            return;
        }
        console.log('[STDOUT]: ' + stdout);
    })
}

const watcher = chokidar.watch('src/index.html', {
    persistent: true,
});

watcher.on('change', path => {
    console.log(path + " <CHANGED!!!>");

    setTimeout(() => {
        console.log("RUNNING... RUNNING... RUNNING... RUNNING......");

        exec('npx prettier --check src/index.html', (error, stdout, stderr) => {
            if (error) {
                console.error(`Prettier found issues:\n${stderr}`);
                console.log('Running another CLI due to detected issues...');
                runCommand('echo "My CLI say: Deu ruim bixo."');
            } else {
                console.log('No issues detected by Prettier.');
                runCommand('echo "My CLI say: NICE!"');
            }
        })
    }, 1000)
})
