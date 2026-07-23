#!/usr/bin/env node

import { mkdirSync, writeFileSync, readFileSync, cpSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import * as readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isInteractive = process.stdin.isTTY;

function ask(question, defaultValue = '') {
  if (!isInteractive) return Promise.resolve(defaultValue);
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

function detectComponentsVersion() {
  const frameworkPath = resolve(__dirname, '..');
  const frameworkPkg = join(frameworkPath, 'package.json');
  if (existsSync(frameworkPkg)) {
    return `file:${frameworkPath}`;
  }
  return '^1.0.0';
}

async function main() {
  console.log('');
  console.log('  ┌─────────────────────────────────────────┐');
  console.log('  │         Components Framework             │');
  console.log('  │    Scaffold a new project                 │');
  console.log('  └─────────────────────────────────────────┘');
  console.log('');

  const args = process.argv.slice(2);
  let projectName = args[0] || '';

  if (!projectName) {
    projectName = await ask('  Project name: ', 'my-app');
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
    console.error('\n  Error: Project name can only contain letters, numbers, hyphens, and underscores.\n');
    process.exit(1);
  }

  const targetDir = resolve(process.cwd(), projectName);
  if (existsSync(targetDir)) {
    console.error(`\n  Error: Directory "${projectName}" already exists.\n`);
    process.exit(1);
  }

  const componentsVersion = detectComponentsVersion();
  console.log(`  Creating project: ${projectName}\n`);

  mkdirSync(targetDir, { recursive: true });

  const templateDir = join(__dirname, 'templates', 'default');
  cpSync(templateDir, targetDir, { recursive: true });

  const pkgPath = join(targetDir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  pkg.name = projectName;
  pkg.dependencies.components = componentsVersion;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  console.log('  Installing dependencies...\n');

  try {
    execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
    console.log('');
    console.log('  ┌─────────────────────────────────────────┐');
    console.log('  │  Project created successfully!           │');
    console.log('  └─────────────────────────────────────────┘');
    console.log('');
    console.log('  Get started:');
    console.log(`    cd ${projectName}`);
    console.log('    npm run dev');
    console.log('');
  } catch {
    console.log('');
    console.log('  Project created but dependencies failed to install.');
    console.log('  Run "npm install" manually.');
    console.log('');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
