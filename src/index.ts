/**
 * @description 应用构建信息打印
 */

import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, UserConfig } from 'vite'

// 全局信息
const GlobalConf = `window__APP_CONFIG__`

export default function (options: UserConfig): Plugin {
  const outputPath = options.build?.outDir ?? 'dist'
  let commandType: 'serve' | 'build'
  return {
    name: 'vite-plugin-build-info-to-html',
    config: (_, { command }) => {
      commandType = command
    },
    transformIndexHtml(rawHtmlStr: string) {
      if (commandType === 'build') {
        // 构建时间戳
        const dateStamp = new Date().toLocaleString()
        const configurationString = `
          ${GlobalConf}=${JSON.stringify(options ?? { output: 'dist' })};
          Object.defineProperty(window, GlobalConf, {
            configurable: false,
            writable: false,
          });
          console.log('%c 构建时间:', 'color:red');
          console.log('$c ${dateStamp}', 'color: #1D63F2');
        `.replace(/\s/g, '')

        fs.writeFileSync(getRootPath(`${outputPath}/__app__config.js`), configurationString)
        rawHtmlStr.replace(/<\/html>/, `<script src="./__app__config__.js?${dateStamp}"></script>\n</html>`)
        return rawHtmlStr
      }
    },
  }
}

function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}
