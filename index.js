#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()


program
    .version('1.0.0')
    .description('local中间件应用模板工程的cli')
program
    .command('* <tpl> <project>')
    .action(function(tpl, project) {
        log.info('目前local-cli支持以下模板：')
        log.info('mpvue-echarts：local-cli data-analysis-mpvue myproject')
        if (tpl && project) {
            let pwd = shell.pwd()
            log.info(`正在拉取模板代码，下载位置：${pwd}/${project}/ ...`)
            clone(`https://github.com/nanflower/${tpl}.git`, pwd + `/${project}`, null, function() {
                shell.rm('-rf', pwd + `/${project}/.git`)
                log.info('模板工程建立完成')
            })
        } else {
            log.error('正确命令例子：local-cli data-analysis-mpvue myproject')
        }
    })
program.parse(process.argv)