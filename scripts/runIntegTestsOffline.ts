import { spawn } from 'child_process';

const mockServer = spawn('serverless', ['offline', 'start'], { shell: true });
const timeout = 1000 * 40; // 40 seconds
let integTestsStarted = false;

mockServer.stdout.on('data', (serverOutput) => {
  console.log(serverOutput.toString());

  if (
    serverOutput.includes('server ready') ||
    serverOutput.includes('Function names exposed for local invocation')
  ) {
    const integTester = spawn('npm', ['run', 'exec:offline'], { stdio: 'inherit', shell: true });
    integTestsStarted = true;

    integTester.on('close', (code) => {
      mockServer.kill('SIGINT');
      process.exit(code || 0);
    });
  }
});

setTimeout(() => {
  if (!integTestsStarted) {
    mockServer.kill('SIGINT');
    console.error('Run offline tests timeout out after 40 seconds.');
    process.exit(1);
  }
}, timeout);
