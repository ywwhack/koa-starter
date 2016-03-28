#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const projectPath = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : process.cwd();
const templatePath = path.resolve(__dirname, '..', 'template');
const copiedFilesName = fs.readdirSync(templatePath);

/**
 * Make sure project path is exists.
 * If path is not exists, create one.
 */
try {
  fs.accessSync(projectPath);
}catch(e) {
  fs.mkdirSync(projectPath);
}

copiedFilesName.forEach((fileName) => {
  const templateFilePath = `${templatePath}/${fileName}`;
  const projectFilePath = `${projectPath}/${fileName}`;
  const content = fs.readFileSync(templateFilePath, 'utf8');

  // if package.json exits already, just copy needed dependencies
  if(fileName == 'package.json') {
    try { // exits
      fs.accessSync(projectFilePath);
      const projectPackageContent = fs.readFileSync(projectFilePath, 'utf8');
      const projectPackageJson = JSON.parse(projectPackageContent);
      const templateJson = JSON.parse(content);
      for(let dependency in templateJson.dependencies) {
        projectPackageJson.dependencies[dependency] = templateJson.dependencies[dependency];
      }
      fs.writeFileSync(projectFilePath, JSON.stringify(projectPackageJson));
    }catch(e) {
      fs.writeFileSync(projectFilePath, content);
    }
  }else {
    fs.writeFileSync(projectFilePath, content);
  }
});

console.log('koa starter is generated complete!');
