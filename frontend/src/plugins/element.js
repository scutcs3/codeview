// 按需引入element组件
import { 
  ElContainer, 
  ElHeader, 
  ElAside, 
  ElMain,
  ElSelect,
  ElOption,
  ElButton,
  ElForm,
  ElInput,
  ElLink,
  ElFormItem
} from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
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
  app.use(ElForm)
  app.use(ElInput)
  app.use(ElLink)
  app.use(ElFormItem)
}
