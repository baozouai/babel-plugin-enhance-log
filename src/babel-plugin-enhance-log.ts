import { declare } from '@babel/helper-plugin-utils'
import generater from '@babel/generator'

interface BabelPluginEnhanceLogOptions {
  /**
   * tip of start argument default 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
   * @example
   * console.log('line of 1 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀', ...)
   */
  preTip?: string
}

const DEFAULT_PRE_TIP = '🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀'

export default declare<BabelPluginEnhanceLogOptions>((babel, { preTip = DEFAULT_PRE_TIP }) => {
  const { types: t } = babel

  return {
    name: 'enhance-log',
    visitor: {
      CallExpression(path) {
        const calleeCode = generater(path.node.callee).code
        if (calleeCode === 'console.log') {
          const nodeArguments = path.node.arguments
          for (let i = 0; i < nodeArguments.length; i++) {
            const argument = nodeArguments[i]
            // @ts-ignore
            if (argument.skip)
              continue
            if (!t.isLiteral(argument)) {
              // @ts-ignore
              argument.skip = true
              nodeArguments.splice(i, 0, t.stringLiteral(`${generater(argument).code}=`))
            }
          }
          const { loc } = path.node
          if (loc) {
            const line = loc.start.line
            nodeArguments.unshift(t.stringLiteral(`line of ${line} ${preTip}: `))
          }
        }
      },
    },
  }
})
