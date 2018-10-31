/**
 * 打印工具类
 */
import ElementUI from 'element-ui'

export default class Print {
  setStaticResourceServer(url) {
    this.staticResourceServer = url
  }

  constructor() {
    this.CreatedOKLodop7766 = null
    if (this.needCLodop()) {
      const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
      let oscript = document.createElement('script')
      oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
      head.insertBefore(oscript, head.firstChild)
      // 引用双端口(8000和18000）避免其中某个被占用：
      oscript = document.createElement('script')
      oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=0'
      head.insertBefore(oscript, head.firstChild)
    }
  }
  /**
   * 判断是否需要安装CLodop云打印服务器
   */
  needCLodop() {
    try {
      const ua = navigator.userAgent
      if (ua.match(/Windows\sPhone/i) != null) return true
      if (ua.match(/iPhone|iPod/i) != null) return true
      if (ua.match(/Android/i) != null) return true
      if (ua.match(/Edge\D?\d+/i) != null) return true
      const verTrident = ua.match(/Trident\D?\d+/i)
      const verIE = ua.match(/MSIE\D?\d+/i)
      let verOPR = ua.match(/OPR\D?\d+/i)
      let verFF = ua.match(/Firefox\D?\d+/i)
      const x64 = ua.match(/x64/i)
      if ((verTrident == null) && (verIE == null) && (x64 !== null)) { return true } else
      if (verFF !== null) {
        verFF = verFF[0].match(/\d+/)
        if ((verFF[0] >= 42) || (x64 !== null)) return true
      } else
      if (verOPR !== null) {
        verOPR = verOPR[0].match(/\d+/)
        if (verOPR[0] >= 32) return true
      } else
      if ((verTrident == null) && (verIE == null)) {
        let verChrome = ua.match(/Chrome\D?\d+/i)
        if (verChrome !== null) {
          verChrome = verChrome[0].match(/\d+/)
          if (verChrome[0] >= 42) return true
        }
      }
      return false
    } catch (err) {
      return true
    }
  }

  setTarget(target) {
    this.element = target
  }

  createDialog(title, url) {
    const h = this.element.$createElement
    this.element.$msgbox({
      title: '打印机安装提示',
      message: h('p', null, [
        h('font', { style: { color: 'rgb(247, 72, 42)' }}, title),
        h('br', null, null),
        h('a', { domProps: { href: url, download: 'install_lodop' }}, '点击这里执行安装'),
        h('br', null, null),
        h('font', null, '安装后请刷新页面')
      ]),
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: '取消'
    }).then(action => {
    }).catch(() => { })
  }

  getCLodop(oOBJECT, oEMBED, oCALLBACK) {
    // const staticResourceServer = this.staticResourceServer
    var lodop32Url = this.staticResourceServer + '/install_lodop32.exe'
    var lodop64Url = this.staticResourceServer + '/install_lodop64.exe'
    var lodopWin32Url = this.staticResourceServer + '/CLodop_Setup_for_Win32NT_2.130.exe'
    var strHtmInstall = '打印控件未安装!'
    var strHtmUpdate = '打印控件需要升级!'
    var strHtm64_Install = '打印控件未安装!'
    var strHtm64_Update = '打印控件需要升级!'
    var strHtmFireFox = '(注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它)'
    var strHtmChrome = '(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装)'
    var strCLodopInstall = 'CLodop云打印服务(localhost本地)未安装启动!'
    var strCLodopUpdate = 'CLodop云打印服务需升级!</font>'
    var LODOP
    var tips = null
    let url = null

    try {
      var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0)
      if (this.needCLodop()) {
        try { LODOP = getCLodop() } catch (err) { console.log(err) }
        if (!LODOP && document.readyState !== 'complete') {
          this.element.$message.error('C-Lodop没准备好，请稍后再试！')
          return
        }
        if (!LODOP) {
          if (isIE) tips = strCLodopInstall
          else { tips = strCLodopInstall }
          this.createDialog(tips, lodopWin32Url)
          return
        } else {
          if (CLODOP.CVERSION < '2.1.3.0') {
            if (isIE) tips = strCLodopUpdate
            else { tips = strCLodopInstall }
            this.createDialog(tips, lodopWin32Url)
            return
          }
          if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED)
          if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT)
        }
      } else {
        var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0)
        // =====如果页面有Lodop就直接使用，没有则新建:==========
        if (oOBJECT !== undefined || oEMBED !== undefined) {
          if (isIE) LODOP = oOBJECT
          else LODOP = oEMBED
        } else if (this.CreatedOKLodop7766 == null) {
          LODOP = document.createElement('object')
          LODOP.setAttribute('width', 0)
          LODOP.setAttribute('height', 0)
          LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;')
          if (isIE) LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA')
          else LODOP.setAttribute('type', 'application/x-print-lodop')
          document.documentElement.appendChild(LODOP)
          this.CreatedOKLodop7766 = LODOP
        } else LODOP = this.CreatedOKLodop7766
        // =====Lodop插件未安装时提示下载地址:==========
        if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
          if (navigator.userAgent.indexOf('Chrome') >= 0) { tips = strHtmChrome }
          if (navigator.userAgent.indexOf('Firefox') >= 0) { tips = strHtmFireFox }
          if (is64IE) {
            tips = strHtm64_Install
            url = lodop64Url
          } else
          if (isIE) {
            tips = strHtmInstall
            url = lodop32Url
          } else { tips = strHtmInstall }
          url = lodop32Url
          this.createDialog(tips, url)
          return LODOP
        }
      }
      if (LODOP.VERSION < '6.2.1.8') {
        if (!this.needCLodop()) {
          if (is64IE) {
            tips = strHtm64_Update
            url = lodopWin32Url
          } else { this.createDialog(tips, url) }
          if (isIE) {
            tips = strHtmUpdate
            url = lodop32Url
          } else { this.createDialog(tips, url) }
        }
        return LODOP
      }
      // ===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
      // ===========================================================
      return LODOP
    } catch (err) {
      // alert("getLodop出错:"+err);\
      ElementUI.Message.error('getLodop出错:' + err)
    }
  }
}
