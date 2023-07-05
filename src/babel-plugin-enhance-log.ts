import { declare } from '@babel/helper-plugin-utils'
import generater from '@babel/generator'
import type { StringLiteral } from '@babel/types'
import { stringLiteral } from '@babel/types'

export type EnableFileName = boolean | {
  /**
   * @default true
   * @example
   * the file name path is src/index.ts
   * if enableDir is true, the log will be src/index.ts
   * if enableDir is false, the log will be index.ts
   */
  enableDir?: boolean
}

export interface Options {
  /**
   * tip of start argument default 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
   * @example
   * console.log('line of 1 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀', ...)
   */
  preTip?: string
  /**
   * every arg split by
   * @example
   * \n
   * ;
   * ,
   */
  splitBy?: string
  /** need endLine, default false */
  endLine?: boolean
  /**
   * to log filename, default false
   */
  enableFileName?: EnableFileName
  /**
   * @description the babel.config.js base path
   * @default process.cwd()
   *  */
  root?: string
}

const DEFAULT_PRE_TIP = '🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀'
const SKIP_KEY = '@@babel-plugin-enhance-logSkip'

function generateStrNode(str: string): StringLiteral & { skip: boolean } {
  const node = stringLiteral(str)
  // @ts-ignore
  node.skip = true
  // @ts-ignore
  return node
}

export default declare<Options>((babel, { preTip = DEFAULT_PRE_TIP, splitBy = '', endLine = false, enableFileName = true, root = process.cwd() }) => {
  const { types: t } = babel
  const splitNode = generateStrNode(splitBy)

  const rootReg = new RegExp(`${root}\\/?`)
  return {
    name: 'enhance-log',
    visitor: {
      CallExpression(path, { filename }) {
        const calleeCode = generater(path.node.callee).code
        if (calleeCode === 'console.log') {
          // add comment to skip if enter next time
          const { trailingComments } = path.node
          const shouldSkip = (trailingComments || []).some((item) => {
            return item.type === 'CommentBlock' && item.value === SKIP_KEY
          })
          if (shouldSkip)
            return

          t.addComment(path.node, 'trailing', SKIP_KEY)

          const nodeArguments = path.node.arguments
          for (let i = 0; i < nodeArguments.length; i++) {
            const argument = nodeArguments[i]
            // @ts-ignore
            if (argument.skip)
              continue
            if (!t.isLiteral(argument)) {
              if (t.isIdentifier(argument) && argument.name === 'undefined') {
                nodeArguments.splice(i + 1, 0, splitNode)
                continue
              }
              // @ts-ignore
              argument.skip = true
              const node = generateStrNode(`${generater(argument).code} =`)

              nodeArguments.splice(i, 0, node)
              nodeArguments.splice(i + 2, 0, splitNode)
            }
            else {
              nodeArguments.splice(i + 1, 0, splitNode)
            }
          }
          // the last needn't split
          if (nodeArguments[nodeArguments.length - 1] === splitNode)
            nodeArguments.pop()
          const { loc } = path.node
          let preTipStr = preTip
          if (enableFileName && filename) {
            let relativeFilename = filename.replace(rootReg, '')
            if (typeof enableFileName === 'object' && !enableFileName.enableDir)
              relativeFilename = relativeFilename.replace(/.*\//, '')

            preTipStr += ` ~ ${relativeFilename}`
          }
          if (loc) {
            const startLine = loc.start.line
            const startLineTipNode = t.stringLiteral(`line of ${startLine} ${preTipStr}:\n`)
            nodeArguments.unshift(startLineTipNode)
            if (endLine) {
              const endLine = loc.end.line
              const endLineTipNode = t.stringLiteral(`\nline of ${endLine} ${preTipStr}:\n`)
              nodeArguments.push(endLineTipNode)
            }
          }
        }
      },
    },
  }
})
