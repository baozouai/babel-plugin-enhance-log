import { expect, it } from 'vitest'
import type { TransformOptions } from '@babel/core'
import { transformSync } from '@babel/core'
import plugin from '../src/babel-plugin-enhance-log'



it('Transforms log default', () => {
  const { code } = transformSync(`
  const a = 1, b = true
  console.log(a, b)
  `, {
    plugins: [plugin],
  })!
  expect(code).toMatchSnapshot()
})

it('Transforms log', () => {
  const { code } = transformSync(`
  const a = 1
  const b = 2
  const e = {
    w: {
      c: '123'
    }
  }
  console.log('1', false, 2, null, undefined, a, e.w.c, b)
  `, {
    plugins: [plugin],
  })!
  expect(code).toMatchSnapshot()
})


const heartPreTip = '🐖🐖🐖🐖🐖🐖🐖🐖🐖'
const multiTypeArg = `
const a = 1
const b = 2
const e = {
  w: {
    c: '123'
  }
}
console.log('1', false, 2, null, undefined, a, e.w.c, b, e)
`
it(`Transforms log width preTip ${heartPreTip}`, () => {
  const { code } = transformSync(multiTypeArg, {
    plugins: [[plugin, {
      preTip: heartPreTip
    }]]
  })!
  expect(code).toMatchSnapshot()
})

it(`Transforms log with lineFeed`, () => {
  const { code } = transformSync(multiTypeArg, {
    plugins: [[plugin, {
      lineFeed: true,
    }]]
  })!
  console.log(code);
  expect(code).toMatchSnapshot()
})

it(`Transforms log  with endLine`, () => {
  const { code } = transformSync(multiTypeArg, {
    plugins: [[plugin, {
      endLine: true,
    }]]
  })!
  console.log(code);
  expect(code).toMatchSnapshot()
})

it(`Transforms log  with endLine, lineFeed`, () => {
  const { code } = transformSync(multiTypeArg, {
    plugins: [[plugin, {
      endLine: true,
      lineFeed: true,
    }]]
  })!
  console.log(code);
  expect(code).toMatchSnapshot()
})