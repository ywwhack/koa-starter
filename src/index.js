#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const projectPath = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : process.cwd()
const templatePath = path.resolve(__dirname, '..', 'template')
const copiedFilesName = fs.readdirSync(templatePath)

/**
 * Make sure project path is exists.
 * If path is not exists, create one.
 */
if (!fs.existsSync(projectPath)) {
  fs.mkdirSync(projectPath)
}

copiedFilesName.forEach(fileName => {
  const templateFilePath = `${templatePath}/${fileName}`
  const projectFilePath = `${projectPath}/${fileName}`
  let content = fs.readFileSync(templateFilePath, 'utf8')

  // package.json needs extra project name
  if(fileName === 'package.json') {
    content = content.replace('__project_name__', path.basename(projectPath))
  }

  fs.writeFileSync(projectFilePath, content)
})

console.log('koa starter is generated complete!')
