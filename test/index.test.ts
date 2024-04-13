import { describe, expect, it } from 'vitest'
import { getAppInfo, getGitInfo } from '../src/utils'

describe('should', () => {
  it('getAppInfo', () => {
    expect(getAppInfo()).toMatchInlineSnapshot(`
      {
        "buildStamp": "2024/4/13 22:05:54",
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
        "commitHash": "c7e203b",
        "describe": "c7e203b",
        "username": "yuzili",
      }
    `)
  })
})
