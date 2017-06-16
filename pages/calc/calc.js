// calc.js
// 获取应用实例
// let app = getApp()
// 引入rpn.js处理计算表达式，类似eval函数
import rpn from '../../utils/rpn.js'

Page({
  data: {
    result: 0,
    formula: ''
  },
  touchEnd (e) {
    // console.log(e.currentTarget.dataset.num)
    let val = e.currentTarget.dataset.num

    // 清空计算表达式
    if (val === 'C') {
      this.setData({
        result: 0,
        formula: ''
      })
      return
    }

    // 退格
    if (val === 'Del') {
      if (this.data.formula.slice(-1) === ' ') {
        this.setData({
          formula: this.data.formula.slice(0, -3)
        })
        return
      }

      this.setData({
        formula: this.data.formula.slice(0, -1)
      })
      return
    }

    // 等号
    if (val === '=') {
      // console.log(this.data.formula)
      // 空直接赋值为0
      if (this.data.formula === '') {
        this.setData({
          result: 0
        })
        return
      }

      // 计算结果
      let result = rpn.calCommonExp(this.data.formula.replace(/\s/g, ''))
      // 分母或除数不能为0的提示
      if (String(result) === 'Infinity') {
        this.setData({
          result: '分母或除数不能为0'
        })
        return
      }
      // 输入公式必须正确（目前格式必须严格）
      if (String(result) === 'NaN') {
        this.setData({
          result: '输入公式错误'
        })
        return
      }
      // 正常情况的结果显示
      this.setData({
        result: result
      })
      return
    }

    // 设置表达式的值
    let _val
    if (isNaN(Number(val))) {
      if (val === '(' || val === ')' || val === '.') {
        _val = val
      } else {
        _val = ' ' + val + ' '
      }
      // console.log(_val)
    } else {
      _val = val
    }

    let _formula = this.data.formula + _val
    this.setData({
      formula: _formula
    })
  }
})
