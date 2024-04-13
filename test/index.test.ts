import { describe, expect, it } from 'vitest'
import { getAppInfo, getGitInfo } from '../src/utils'

describe('should', () => {
  it('getAppInfo', () => {
    expect(getAppInfo()).toMatchInlineSnapshot(`
      {
        "buildStamp": "2024/4/13 15:45:10",
        "name": "vite-plugin-build-info-to-html",
        "version": "0.0.1",
      }
    `)
  })
  it('getGitInfo', async () => {
    const gitInfo = await getGitInfo()
    expect(gitInfo).toMatchInlineSnapshot(`
      {
        "branch": "main",
        "commitHash": "2cd5585",
        "describe": "2cd5585",
        "username": "yuzili",
      }
    `)
  })
})
