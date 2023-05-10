import { declare } from '@babel/helper-plugin-utils'
import generater from '@babel/generator'
import type { StringLiteral } from '@babel/types'
import { stringLiteral } from '@babel/types'
interface BabelPluginEnhanceLogOptions {
  /**
   * tip of start argument default 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
   * @example
   * console.log('line of 1 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀', ...)
   */
  preTip?: string
  /** add \n for every arg, default true */
  lineFeed?: boolean
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
const LineFeedNode = generateStrNode('\n')

export default declare<BabelPluginEnhanceLogOptions>((babel, { preTip = DEFAULT_PRE_TIP, lineFeed = true }) => {
  const { types: t } = babel

  return {
    name: 'enhance-log',
    visitor: {
      CallExpression(path) {
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
                if (lineFeed)
                  nodeArguments.splice(i + 1, 0, LineFeedNode)
                continue
              }
              // @ts-ignore
              argument.skip = true
              const node = generateStrNode(`${generater(argument).code} =`)

              nodeArguments.splice(i, 0, node)
              if (lineFeed)
                nodeArguments.splice(i + 2, 0, LineFeedNode)
            }
            else {
              if (lineFeed)
                nodeArguments.splice(i + 1, 0, LineFeedNode)
            }
          }
          const { loc } = path.node
          if (loc) {
            const line = loc.start.line
            const lineTipNode = t.stringLiteral(`line of ${line} ${preTip}:\n`)
            nodeArguments.unshift(lineTipNode)
          }
        }
      },
    },
  }
})
