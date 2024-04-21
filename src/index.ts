import type { IndexHtmlTransformResult, Plugin } from 'vite'
import type { Build_Info_To_Html } from './types'
import { getAppInfo, getGitInfo } from './utils'

// 全局信息
const GlobalConf = `__APP_CONFIG__`

export default function BuildInfoToHtml(options?: Build_Info_To_Html): Plugin {
  const { showBuildUser = true, enableGloabl = false, enableLog = true, enableMeta = true } = options || {}
  return {
    name: 'vite-plugin-build-info-to-html',
    apply: 'build',
    async transformIndexHtml() {
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
      if (enableLog) {
        extraInfos.push({
          tag: 'script',
          injectTo: 'body',
          children: `
          console.log(
            '%c ${appInfo.name} %c Detected ${appInfo.version} %c',
            'background:#3F485A ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#1B55FF ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:transparent'
          );
          console.log(${appInfoString});`,
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
    },
  }
}
