import type { FC } from 'react'
import DeepFile from './xxx/yyy/zzzzzzzzzzz'

const index: FC = () => {
  const a = 1
  const b = 2
  console.log(a, b)
  return (
    <div>
      <button onClick={() => console.log(a, b)}>点击log a和b</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <DeepFile />
    </div>
  )
}

export default index
