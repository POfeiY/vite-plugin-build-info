import { describe, expect, it } from 'vitest'
import { getAppInfo, getGitInfo } from '../src/utils'
import BuildInfoToHtml from '../src'

describe('should', () => {
  it('getAppInfo', () => {
    expect(getAppInfo()).toMatchInlineSnapshot(`
      {
        "buildStamp": "2024/4/17 23:02:15",
        "name": "vite-plugin-build-info-to-html",
        "version": "0.1.1-beta.4",
      }
    `)
  })
  it('getGitInfo', async () => {
    const gitInfo = await getGitInfo()
    expect(gitInfo).toMatchInlineSnapshot(`
      {
        "branch": "main",
        "commitHash": "19ae677",
        "describe": "v0.1.1-beta.4-5-g19ae677",
        "username": "yuzili",
      }
    `)
  })
  it('buildInfoToHtml', () => {
    expect(BuildInfoToHtml()).toMatchInlineSnapshot(`
      {
        "name": "vite-plugin-build-info-to-html",
        "transformIndexHtml": [Function],
      }
    `)
  })
})
