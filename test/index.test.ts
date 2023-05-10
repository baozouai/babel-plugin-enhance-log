import { expect, it } from 'vitest'
import type { TransformOptions } from '@babel/core'
import { transformSync } from '@babel/core'
import plugin from '../src/babel-plugin-enhance-log'

const defaultOptions: TransformOptions = {
  plugins: [plugin],
}

it('Transforms log1', () => {
  const { code } = transformSync(`
  const a = 1
  b = true
  console.log(a, b)
  `, defaultOptions)!
  expect(code).toMatchSnapshot()
})

it('Transforms log2', () => {
  const { code } = transformSync(`
  const a = 1
  const b = 2
  const e = {
    w: {
      c: '123'
    }
  }
  console.log('1', false, 2, null, undefined, a, e.w.c, b)
  `, defaultOptions)!
  expect(code).toMatchSnapshot()
})