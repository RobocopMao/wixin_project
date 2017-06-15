//index.js
//获取应用实例
let app = getApp()
let rpn = require('../../utils/rpn.js');
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

    let _val
    // console.log(Number(val))
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

    if (val === '=') {
      // console.log(this.data.formula)
      // 空直接赋值为0
      if (this.data.formula === '') {
        this.setData({
          result: 0
        })

        return
      }

      console.log(this.data.formula.replace(/\s/g, ''))
      let result = rpn.calCommonExp(this.data.formula.replace(/\s/g, ''))
      this.setData({
        result: result
      })
      return;
    }

    this.setData({
      formula: _formula
    })
  },
  getResult (str) {
    console.log(window)
    let arr = str.split(' ')
    // console.log(arr)
    for(let [key, item] of arr.entries()) {
      console.log(key + ':' + item)
      
    }
    return str
  },
  evil(str) {
    var _str = 'return ' + str
    return new Function(_str)()
  }
})
