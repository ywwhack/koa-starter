#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const projectPath = process.cwd();
const templatePath = path.resolve(__dirname, '..', 'template');
const copiedFilesName = fs.readdirSync(templatePath);

copiedFilesName.forEach((fileName) => {
  const templateFilePath = `${templatePath}/${fileName}`;
  const projectFilePath = `${projectPath}/${fileName}`;
  const content = fs.readFileSync(templateFilePath, 'utf8');

  // if package.json exits already, just copy needed dependencies
  if(fileName == 'package.json') {
    try { // exits
      fs.statSync(projectFilePath);
      const projectPackageContent = fs.readFileSync(projectFilePath, 'utf8');
      const projectPackageJson = JSON.parse(projectPackageContent);
      const templateJson = JSON.parse(content);
      console.log(projectPackageJson);
      console.log(templateJson);
      for(let dependency in templateJson.dependencies) {
        projectPackageJson.dependencies[dependency] = templateJson.dependencies[dependency];
      }
      fs.writeFileSync(projectFilePath, JSON.stringify(projectPackageJson));
    }catch(e) {
      console.log(e);
      fs.writeFileSync(projectFilePath, content);
    }
  }else {
    fs.writeFileSync(projectFilePath, content);
  }
});

console.log('koa starter is generated complete!');