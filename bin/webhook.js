const secret = "codeview";
const path = require('path');
const repo = path.resolve('..');
console.log('Detect repo path: ', repo);

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        console.log('Receive chunk: ', chunk);
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            console.log('Auto update repo at: ', new Date().toISOString());
            exec('git pull', {
                cwd: repo,
            }, (err, stdout, stderr) => {
                console.log('ERROR: ', err);
                console.log('STDOUT: ', stdout);
                console.log('STDERR: ', stderr);
            });
        }
    });
    res.end();
}).listen(3001);

console.log('WebHook Server running...');