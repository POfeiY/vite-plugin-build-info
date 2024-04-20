import { describe, expect, it } from 'vitest'
import { getAppInfo, getGitInfo } from '../src/utils'
import BuildInfoToHtml from '../src'

describe('should', () => {
  it('getAppInfo', () => {
    expect(getAppInfo()).toMatchInlineSnapshot(`
      {
        "buildStamp": "2024/4/20 19:29:12",
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
        "commitHash": "819232a",
        "describe": "v0.1.1-beta.4-6-g819232a",
        "username": "yuzili",
      }
    `)
  })
  it('buildInfoToHtml', async () => {
    expect(BuildInfoToHtml()).toMatchInlineSnapshot(`
      {
        "name": "vite-plugin-build-info-to-html",
        "transformIndexHtml": [Function],
      }
    `)
  })
})
