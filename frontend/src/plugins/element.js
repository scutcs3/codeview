// 按需引入element组件
import { 
  ElContainer, 
  ElHeader, 
  ElAside, 
  ElMain,
  ElSelect,
  ElOption,
  ElButton,
} from 'element-plus'

import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'

export default (app) => {
  locale.use(lang)
  app.use(ElContainer)
  app.use(ElHeader)
  app.use(ElAside)
  app.use(ElMain)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElButton)
}
