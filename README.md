

# 规范

问题: 我们每个人的ide，或者相同的ide但是ide的配置不一样导致格式化的代码不一样，甚至说开发之间不同的代码格式化习惯也不一样，但是我们希望在代码仓库中对提交的代码保证统一规范的格式化。这样方便我们对代码格式的统一管理、防止出现因为格式化问题产生文件中大量的代码但是因为格式化问题被修改掉、方便对代码仓库的提交记录进行review。

解决
- 使用统一的ide和统一的配置
  缺点: 配置脱离于项目，可能会对开发者的开发习惯产生影响，延误开发效率，可能会对别的项目产生影响，可能会受到编译器版本的影响。有些依赖于当前电脑的编译器。
- 使用工程化的方式对项目的配置进行统一的管理
  优点： 开发者可以使用任意自己喜欢的格式化工具，项目中会有git 的hook在commit的时候对暂存区的代码进行统一的格式化。

1. 安装prettier依赖
    `npm install --save-dev --save-exact prettier`

2. 创建 .prettierrc.js 配置文件

    > echo {}> .prettierrc.json

    https://prettier.io/docs/en/options.html#print-width

3. 添加.prettierignore

4. 此时我们就可以使用 `npx prettier --write .`, 来格式化所有的文件。
   但是，我们不希望每次自己输入命令去执行，希望在commit的时候自动化去执行。

5. 安装lint-staged
    `npx mrm@2 lint-staged`
    node版本需要 `14.19.1` +

6. 修改packjson中的lint-staged配置, 添加对ts,tsx类型文件的支持
    ```json
      "lint-staged": {
          "*.{js,css,md,ts,tsx}": "prettier --write"
      }
    ```

7. 如果项目项目配置中使用了eslint的时候
    prettier和eslint可能会有冲突,  `npm i eslint-config-prettier`
    在package.json中添加
    ```js
      "eslintConfig": {
        "extends": [
          "react-app",
          "react-app/jest",
        + "prettier" // prettier中的规则会覆盖eslint中的规则
        ]
      }
    ```

现在我们在git commit 的时候,   就会自动的进行格式化了。
```js
    备注：如果你只是添加了几个空格， 然后git commit， 那么会出现警告 lint-staged prevented an empty git commit.
    lint-staged会阻止你的提交。所以它会帮你检查这次提交是否是一个有效的提交。

    如果出现了特殊的情况，需要提交这次被检测出来为空的提交，那么可以在._husky下的pre-commit中给lint-staged添加参数 npx lint-staged --allow-empty。 当提交之后把--allow-empty删除。
```

8. 在commit的时候我们想要去规范commit的message
     	  github文档： https://github.com/conventional-changelog/commitlint
       
    - ` npm i commitlint `
    
    -  ` echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js `
    
    - ```js
      cat <<EEE > .husky/commit-msg
      #!/bin/sh
      . "\$(dirname "\$0")/_/husky.sh"
      
      npx --no -- commitlint --edit "\${1}"
      EEE
      ```
    
    - `chmod a+x .husky/commit-msg`  将  `'.husky/commit-msg'`   设置为可执行
    
      
    
      规范文档： https://github.com/conventional-changelog/commitlint/#what-is-commitlint



# mock数据

## 简要说明

由于后端与前端并行开发，所以在前期是没有后端接口可以使用的

所以学会最适合自己的 Mock 数据的方法就非常重要

对比业界常见的 Mock 方案，选择并配置其中最合适的方案

## 常见 MOCK 方案

### 1. 代码侵入 (直接在代码中写死 Mock 数据，或者请求本地的 JSON 文件)

优点：无

缺点：

1. 和其他方案比 Mock 效果不好
2. 与真实 Server 环境的切换非常麻烦，一切需要侵入代码切换环境的行为都是不好的

### 2. 请求拦截

代表：[Mock.js](http://mockjs.com/)

示例：

```
Mock.mock(/\\\\/api\\\\/visitor\\\\/list/, 'get', {
  code: 2000,
  msg: 'ok',
  'data|10': [
    {
      'id|+1': 6,
      'name': '@csentence(5)',
      'tag': '@integer(6, 9)-@integer(10, 14)岁 @cword("零有", 1)基础',
      'lesson_image': "<https://images.pexels.com/3737094/pexels-photo-3737094.jpeg>",
      'lesson_package': 'L1基础指令课',
      'done': '@integer(10000, 99999)',
    }
  ]
})
```

优点：

1. 与前端代码分离
2. 可生成随机数据

缺点：

1. 数据都是动态生成的假数据，无法真实模拟增删改查的情况
2. 只支持 ajax，不支持 fetch

(想要了解 ajax 和 fetch 区别的同学来点[我](https://zhuanlan.zhihu.com/p/24594294))

### 3. 接口管理工具

代表：[rap](https://github.com/thx/RAP), [swagger](https://swagger.io/), [moco](https://github.com/dreamhead/moco), [yapi](https://github.com/YMFE/yapi)

优点：

1. 配置功能强大，接口管理与 Mock 一体，后端修改接口 Mock 也跟着更改，可靠

缺点：

1. 配置复杂，依赖后端，可能会出现后端不愿意出手，或者等配置完了，接口也开发出来了的情况。
2. 一般会作为大团队的基础建设而存在， 没有这个条件的话慎重考虑

### 4. 本地 node 服务器

代表：[json-server](https://github.com/typicode/json-server)

优点：

1. 配置简单，json-server 甚至可以 0 代码 30 秒启动一个 REST API Server
2. 自定义程度高，一切尽在掌控中
3. 增删改查真实模拟

缺点：

1. 与接口管理工具相比，无法随着后端 API 的修改而自动修改

注: 
  只能模拟普通的Restful风格的API， 如果要做一个如login这样的功能，那么就要加入中间件。

## REST API

一句话总结：URI 代表 资源/对象，METHOD 代表行为

```
GET /tickets // 列表
GET /tickets/12 // 详情
POST /tickets  // 增加
PUT /tickets/12 // 替换
PATCH /tickets/12 // 修改
DELETE /tickets/12 // 删除
```

点 [我](https://segmentfault.com/q/1010000005685904) 了解 `patch vs put` 


## react hook
```js
  const isFalsy = (value: string) => (value === '0' ? false : !value)
  // 我们是否要把cleanObjectNotContainerZero这个函数写成hook呢？
  // 其实是不需要的
  // 自定义hook的内部是要有使用react内置的hook的。 而cleanObjectNotContainerZero内部并没有使用到内部的hook
  // 如果一个函数我们需要使用react提供的自定义钩子，那么可以做一个自定义hook来方便复用。
  export function cleanObjectNotContainerZero(obj: any) {
    const newObj = { ...obj }
    Object.keys(newObj).forEach((key: string) => {
      const v = newObj[key]
      if (isFalsy(v)) {
        delete newObj[key]
      }
    })
    return newObj
  }
```

什么时候用函数，什么时候用hook？
对应custom hook来说，最大的特征就是内部需要使用到别的hook。而如果一个函数内部不需要使用到别的hook那么做一个函数也挺好的。


xxx.d.ts  是给  xxx.js 打补丁用的。

## ts和java的区别
鸭子类型:  ts中是面向接口编程，而不是面向对象编程

```js
  interface Student {
    name: string,
    age: number
  }
  function test(data: Student) {
    return data
  }
  const s1: Student = { name: 'zs', age: 123 }
  // s2并没有显式的标明是一个Student类型，但是 `test(s2)` 并没有报错，这就是ts和其他如java这种强类型语言的其中一个区别。
  // 所以test函数需要的参数根本就不关心你传入的数据是不是标明了是Student类型。只要符合Student接口的数据就可以了。这就是鸭子类型。
  const s2 = { name: 'qq', age: 111 }
  test(s1)
  test(s2)
```

### ts中的类型兼容
```js
  interface Base {
    id: number
  }
  interface Advance extends Base {
    name: string
  }
  function test(data: Base) { }

  const advanceData: Advance = {id: 123, name: 'qqq'}
  // 我要的是一个Base类型的参数，但是你给我传递了一个更强大的Advance类型，我也可以接受。
  test(advanceData)
```



### ts类型体操之Utility Type

```js

// 类型别名、Utility Type 讲解
// 联合类型
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
// TS2322: Type '{}' is not assignable to type 'string | number'.
// myFavoriteNumber = {}
let jackFavoriteNumber: string | number;

// 类型别名在很多情况下可以和interface互换
// interface Person {
//   name: string
// }
// type Person = { name: string }
// const xiaoMing: Person = {name: 'xiaoming'}

// interface 在联合类型下没法替代type
// 类型别名, 
type FavoriteNumber = string | number;
let roseFavoriteNumber: FavoriteNumber = "6";

// interface 也没法实现Utility type
type Person = {
  name: string;
  age: number;
};

// unitlity Type 
// 我们完全可以重新改原来的type来满足我们的业务需求，但是原来的type可能是第三方库中的，或者我们为了代码整洁性，所以我们并不想修改原来的type


// 将泛型中所有的key都变成了 key?: value
const xiaoMing: Partial<Person> = { };
// 第二个参数是要删除的属性名
// 当使用Omit将属性全部删除完之后，那么这个type或者interface也就没有意义了，想些啥就写啥，
const shenMiRen: Omit<Person, "name" | "age"> = {};

// keyof 就是把Person的键名全部取出来。
type PersonKeys = keyof Person; 
// 等价于:  type PersonKeys = 'name' | 'age'

// 第二参数是要拿出来的类型。和Omit相反
// type PersonOnlyName = Pick<Person, "name" | "age">;
type PersonOnlyName = Pick<Person, "name">;
// 等价于
// type PersonOnlyName = {
//   name: string
// }

// 从联合类型中过滤出类型
type Age = Exclude<PersonKeys, "name">;
// 等价于 type Age = "age"

// Partial 的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};

```



## flex布局和grid布局

```js
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 */
```

## custom hook

custom hook 大都是函数中返回一个函数， 闭包。 如果需要返回的数据需要外部的xxx参数，那么就需要闭包的。这个概念和思想很重要。

我们自定义的hook返回值问题，我们可以返回一个tuple， 也可以返回一个对象，当返回值小于等于三个的时候，返回tuple，当返回值大于三个的时候返回对象，因为使用tuple的好处是导出的时候可以随便命名， 比如useState， 可以 `const [a, setA] = useState()`， 但是先后顺序不能乱，如果不知道需要看源代码第一个是什么，第二个是什么， 使用对象的好处是导出的时候顺序随便写， 但是导出的时候不能随便命名。

## 处理react项目中的title

https://github.com/nfl/react-helmet

## 梳理整体流程

1. user用户信息由provider提供，当页面加载时根据localstorage中token获取用户信息。
   ```js
   <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
   ```
   向外暴露用户信息，登录/注册/退出方法
2. 封装custom hooks， 向外暴露这个AuthContext context。以方便获取用户信息和登录行为。
  ```js
    export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
      throw new Error('useAuth必须在AuthProvider中展示')
      }
      return context
    }
  ```
3. 封装custom hook    `useAsync<User | null>();`  ， 功能为对接口请求进行处理， 向外暴露该promise的状态和数据

   - promise的结果  即data
   - promise发生错误的 error
   - isLoading是否正在请求中
   - isIdel 尚未开始
   - isError 是否错误
   - run 执行promise的方法
   - setData 设置数据

   ```js
   import { useState } from "react"
   
   export interface State<D> {
     error: Error | null,
     data: D | null,
     stat: 'idle' | 'loading' | 'error' | 'success'
   }
   
   const defaultInitalState: State<null> = {
     stat: "idle",
     data: null,
     error: null,
   }
   
   const defaultConfig = {
     throwOnError: false,
   };
   // useAsync 封装了获取异步请求的状态， 只要将异步操作传递进来，那么该custom hook返回的数据有数据的状态和数据内容，在外面直接使用即可。
   export function useAsync<D>(
     initialState?: State<D>,
     initialConfig?: typeof defaultConfig
   ) {
     const config = { ...defaultConfig, ...initialConfig };
   
     const [state, setState] = useState({
       ...defaultInitalState,
       ...initialState
     })
   
     const setData = (data: D) => setState({
       stat: 'success',
       data,
       error: null
     })
   
     const setError = (error: Error) => setState({
       stat: 'error',
       data: null,
       error
     })
   
     const run = (promise: Promise<D>) => {
       if (!promise || !promise.then) {
         throw new Error("请传入promise类型的参数")
       }
   
       setState({...state, stat: 'loading'})
       return promise
         .then(data => {
           setData(data)
           return data
         })
         .catch(error => {
           setError(error)
           if (config.throwOnError) return Promise.reject(error);
           return error;
         })
     }
   
     return {
       isIdle: state.stat === "idle",
       isLoading: state.stat === "loading",
       isError: state.stat === "error",
       isSuccess: state.stat === "success",
       run,
       setData,
       setError,
       ...state,
     }
   }
   ```

4. 在App.tsx中使用ErrorBoundle包裹App组件捕获边界错误

   开源库 `https://github.com/bvaughn/react-error-boundary`

   根据user判断是进入 `有权限组件` 还是 `无权限组件`

   无权限组件为登录和注册组件，有权限组件为页面级的组件



## react-router@6

- 没有`Switch`和`Redirect`组件可以使用了
- 新增了一个`Routes`组件，所有的`Route`组件都应该被Routes包裹，在`Routes`组件外使用`Route`将报错
- `Navigate`组件不能写在`Routes`中，否则也会报错，也就是`Routes`组件只接收`Route`作为其子组件

​	使用Navigation进行兜底

```jsx
<Router>
  <Link to={"/aaa"}>to 1 aaa</Link>
  <Link to="/bbb">to 2 bbb</Link>
	<Routes>
    <Route path="aaa" element={<Child />}></Route>
    <Route path="bbb" element={<Child2 />}></Route>
    <Route path="*" element={<Navigate to={"aaa"} replace />}></Route>
	</Routes>
</Router>
```



## why-did-you-render

https://github.com/welldone-software/why-did-you-render

> 查找是什么造成了无限渲染





## react中的坑

1. 尽量不要让对象作为useEffect/useMemo的依赖值。 但是如果这个对象是useState产生的，那么就没问题。

2. 当组件中使用useState管理数据的时候，那么这个数据  1. 不管这个 `useState` 在哪里定义的，那么当setState发生的时候，整个组件都会被重新渲染。2. 状态被保存了，不会随着下次组件更新重置掉数据。 
3. 如果你要在自定义hook中返回一个函数的话， 那么大概率这个函数是需要被useCallback包裹的。

## for of 遍历对象

> 我们可以给对象自定义[Symbol.iterator]属性(该属性是一个函数)， 来自定义遍历对象的逻辑。
>
> iterator是一个抽象的遍历逻辑，而数组/Map/对象已经天然的部署好了iterator，如果我们要想实现自己的遍历逻辑，那么就可以自定义自己的遍历逻辑。

```js

const obj = {
  data: ["hello", "world"],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++] + "!",
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (let o of obj) {
  console.log(o);
}
```



## 二次封装antd组件

```jsx
import { Rate } from "antd";

// 在原有组件的props上继续扩展属性
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean,
  onChangeChecked?: (checked: boolean) => void
}

// 对Rate组件进行二次处理
export default function Pin(props: PinProps) {
  const { checked, onChangeChecked = ()=>{} } = props
  return (
    <Rate count={1} value={ checked ? 1 : 0 } onChange={value => onChangeChecked(!!value)} />
  )
}
```



柯里化

> onChangeChecked?: (checked: boolean) => void

原来的：

```jsx
// 没有changeChecked函数， 直接return
return <Pin checked={project.pin}  onChangeChecked={pin => editRun({...project, pin})}/>
```

现在的：

```jsx
// 柯里化函数
const changeChecked = (project: Project) => (checked: boolean) => editRun({id: project.id, pin: checked})
// return 柯里化函数
return <Pin checked={project.pin}  onChangeChecked={changeChecked(project)}/>
```





## react 保存一个函数的状态

1. 使用useState

```jsx
const [ callback, setCallback ] = useState(() => () => { alert('init') })

return (
	<button onClick={callback}>call callback</button>
  <button onClick={() => setCallback(() => () => alert('update'))}>setCallback</button>
)
```

2. 使用useRef

```jsx
const callbackRef = React.useRef(() => alert("init"));
const callback = callbackRef.current;

return (
    <div className="App">
      <button onClick={() => (callbackRef.current = () => alert("updated"))}>
        setCallback
      </button>
    	// 必须这么写，才能保证拿到的current是最新的， 因为callbackRef.current = () => alert("updated") 这行代码并不能让该组件重新渲染，所以callback还是原来的
      <button onClick={() => callbackRef.current()}>call callback</button>
      // 不能这么写
    	<!-- <button onClick={callback}>call callback</button> -->
    	// 这样也不行, 因为从callbackRef中读current属性这个操作，只会在第一次渲染的时候执行。
    	<!-- <button onClick={callbackRef.current}>call callback</button> -->
    </div>
);
```



## 卸载组件错误-在@17中被修复了

> 问题出现的情况： 如果一个请求需要很长时间返回之后然后触发该组件的setState，但是在这个请求到来之前，这个组件被卸载掉但是还触发了setState去re-render这个组件，那么就会出现unmount component not render... 这样的错误。

```js
/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
*/
export const useMountedRef = () => {
  // 使用useRef
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
```



## useRef

如果用户想定义一个变量，希望这个变量的值不随着re-render被重新定义，但是又想在一些操作中改变这个变量的值。 只能用useRef。

定义一个只在更新阶段执行的useEffect

```js
const isUpdated = useRef(false) // 是否是更新阶段
useEffect(() => {
  isUpdated.current = true // 第一次渲染置为true
}, [])

// 只在更新阶段执行的useEffect hook
useEffect(() => {
  if (isUpdated.current) {
    // TODO..
  }
})
```



## redux

> redux是一个全局状态管理库，redux中的数据是可预测的，因为redux中控制数据的reducer是一个纯函数，即相同的输入一定会有相同的输出。



redux中的异步操作

```js
// 方式1: 
loadTodo().then(todo => dispatch(addTodo(todo)))

// 方式2: 
dispatch(addTodoAsync())

// 在组件中我们不想关心这个异步的细节，不想关心这个异步的需要做什么操作，什么细节，什么处理数据， 所有的操作和细节和处理数据都隐藏在addTodoAsync这个函数中了。redux-thunk让我们异步的函数可以写在action中，
```

为什么需要redux-thunk

因为reducer必须是一个纯函数，而redux-thunk可以处理函数。