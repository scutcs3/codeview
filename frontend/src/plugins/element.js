// 按需引入element组件
import {
    ElContainer,
    ElHeader,
    ElFooter,
    ElAside,
    ElMain,
    ElSelect,
    ElOption,
    ElButton,
    ElForm,
    ElInput,
    ElLink,
    ElFormItem,
    ElRow,
    ElCol,
    ElMenu,
    ElMenuItem,
    ElTable,
    ElTableColumn,
    ElLoading,
    ElDialog,
    ElDatePicker,
    ElPagination,
    ElImage,
} from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'

export default (app) => {
    locale.use(lang)
    app.use(ElContainer)
    app.use(ElHeader)
    app.use(ElFooter)
    app.use(ElAside)
    app.use(ElMain)
    app.use(ElSelect)
    app.use(ElOption)
    app.use(ElButton)
    app.use(ElForm)
    app.use(ElInput)
    app.use(ElLink)
    app.use(ElFormItem)
    app.use(ElRow)
    app.use(ElCol)
    app.use(ElMenu)
    app.use(ElMenuItem)
    app.use(ElTable)
    app.use(ElTableColumn)
    app.use(ElLoading)
    app.use(ElDialog)
    app.use(ElDatePicker)
    app.use(ElPagination)
    app.use(ElImage)
}