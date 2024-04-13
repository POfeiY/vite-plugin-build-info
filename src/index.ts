/**
 * @description 应用构建信息打印（应用字段+git字段）
 */

import type { IndexHtmlTransformResult, Plugin, UserConfig } from 'vite'
import { getAppInfo, getGitInfo } from './utils'
import type { Build_Info_To_Html } from './types'

// 全局信息
const GlobalConf = `window__APP_CONFIG__`

export default function (options: UserConfig & Build_Info_To_Html): Plugin {
  let commandType: 'serve' | 'build'
  const { showBuildUser = true, enableGloabl = false, enableLog = true, enableMeta = true } = options || {}
  return {
    name: 'vite-plugin-build-info-to-html',
    config: (_, { command }) => {
      commandType = command
    },
    async transformIndexHtml() {
      if (commandType === 'build') {
        const extraInfos: IndexHtmlTransformResult = []
        const appInfo = getAppInfo()
        const mountInfo: Record<string, unknown> = {
          ...appInfo,
        }

        try {
          const { commitHash, describe, branch, username } = await getGitInfo()
          mountInfo.commitHash = commitHash
          mountInfo.describe = describe
          mountInfo.branch = branch
          if (showBuildUser)
            mountInfo.username = username
        }
        catch (error) {
          console.warn('获取git信息失败', error)
        }

        const appInfoString = JSON.stringify(mountInfo).replace(/"/g, '\'')
        // html meta content
        if (enableMeta) {
          extraInfos.push({
            tag: 'meta',
            injectTo: 'head-prepend',
            attrs: { name: 'app-info', content: appInfoString },
          })
        }
        // log TODO: format
        if (enableLog) {
          extraInfos.push({
            tag: 'script',
            injectTo: 'body',
            children: `console.log(${appInfoString})`,
          })
        }
        if (enableGloabl) {
          extraInfos.push({
            tag: 'script',
            injectTo: 'body',
            children: `window.${GlobalConf}=${appInfoString}`,
          })
        }
        return extraInfos
      }
    },
  }
}
