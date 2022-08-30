// 导入 模块
import dayjs from 'dayjs'
// 加载语言包
import 'dayjs/locale/zh-cn'
// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 注册相对时间插件
dayjs.extend(relativeTime)
// 使用语言包
dayjs.locale('zh-cn')

// 导出配置完毕的dayjs函数对象
export default dayjs
