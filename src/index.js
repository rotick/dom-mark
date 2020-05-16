class DomMark {
  constructor (el = 'body', options = {}) {
    this.container = null
    this.box = null
    this.observer = null
    if (el instanceof window.HTMLElement) {
      this.container = el
    } else {
      this.container = document.querySelector(el)
    }
    if (!this.container) throw new Error(`invalid selector: ${el}`)

    this._setOptions(options)
  }

  render () {
    const { content, fontSize, fontFamily, opacity, color, padding, zIndex, minMargin, rotate, observe } = this.options
    const containerStyle = window.getComputedStyle(this.container)
    if (containerStyle.position === 'static') {
      this.container.style.position = 'relative'
    }

    const box = this.box || document.createElement('div')
    this.box = box
    let temp = document.createElement('div')
    box.style.cssText = `position:absolute;top:0;left:0;right:0;bottom:0;font-size:${fontSize};
    font-family:${fontFamily};opacity:${opacity};color:${color};pointer-events:none;
    user-select: none;-ms-user-select: none;z-index:${zIndex};z-index:-1\\9;`
    box.setAttribute('powered-by', 'https://github.com/funinps/dom-mark')
    box.setAttribute('onselectstart', 'return false;')
    box.setAttribute('ondragstart', 'return false;')
    temp.style.cssText = 'position:absolute;top:0;left:0;opacity:0;'
    temp.innerHTML = content
    box.appendChild(temp)
    this.container.appendChild(box)

    const draw = () => {
      const boxStyle = window.getComputedStyle(box)
      const boxWidth = Number(boxStyle.width.replace('px', ''))
      const boxHeight = Number(boxStyle.height.replace('px', ''))

      const tempStyle = window.getComputedStyle(temp)
      const itemWidth = Number(tempStyle.width.replace('px', ''))
      const itemHeight = Number(tempStyle.height.replace('px', ''))
      temp = null

      const items = this._arrange({
        boxWidth,
        boxHeight,
        itemWidth,
        itemHeight,
        boxPadding: padding,
        minMarginH: minMargin[1],
        minMarginV: minMargin[0]
      })

      const domItems = items.map(item => {
        return `<div style="position:absolute;top:${item.y}px;left:${item.x}px;transform:rotate(${rotate}deg);">${content}</div>`
      })
      box.innerHTML = domItems.join('')

      observe && this._observe()
    }

    const contentImages = box.querySelectorAll('img')
    if (contentImages.length) {
      const loaded = []
      for (let i = 0; i < contentImages.length; i++) {
        const img = contentImages[i]
        img.onload = () => {
          loaded.push(1)
          if (loaded.length === contentImages.length) {
            draw()
          }
        }
        img.onerror = () => {
          throw new Error(`image load error: ${img.src}`)
        }
      }
    } else {
      draw()
    }
  }

  update (options) {
    this.observer && this.observer.disconnect()
    this._setOptions(options)
    this.render()
  }

  destroy () {
    this.observer && this.observer.disconnect()
    this.box && this.box.remove()
  }

  _setOptions (options) {
    if (options.padding && typeof options.padding !== 'number') {
      throw new TypeError('padding must be a number')
    }
    if (options.minMargin && (!Array.isArray(options.minMargin) || options.minMargin.length < 2 || typeof options.minMargin[0] !== 'number' || typeof options.minMargin[1] !== 'number')) {
      throw new TypeError('minMargin must be an array with 2 number item')
    }
    this.options = Object.assign({
      content: '',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      color: 'inherit',
      opacity: 0.3,
      padding: 20,
      zIndex: 6000,
      minMargin: [40, 20],
      rotate: -15,
      observe: true
    }, this.options, options)
  }

  _arrange (options) {
    const {
      boxWidth = 800,
      boxHeight = 600,
      boxPadding = 10,
      itemWidth = 90,
      itemHeight = 30,
      minMarginH = 10,
      minMarginV = 10
    } = options

    const xCount = Math.floor((boxWidth - boxPadding * 2) / (itemWidth + minMarginH))
    const yCount = Math.floor((boxHeight - boxPadding * 2) / (itemHeight + minMarginV))

    const realMarginH = (boxWidth - boxPadding * 2 - itemWidth * xCount) / (xCount - 1)
    const realMarginV = (boxHeight - boxPadding * 2 - itemHeight * yCount) / (yCount - 1)
    const count = xCount * yCount

    const arr = []
    for (let index = 1; index <= count; index++) {
      const colNum = index % xCount === 0 ? xCount - 1 : index % xCount - 1
      const left = boxPadding + colNum * (itemWidth + realMarginH)
      const top = boxPadding + (Math.ceil(index / xCount) - 1) * (itemHeight + realMarginV)
      arr.push({
        x: left,
        y: top
      })
    }
    return arr
  }

  _observe () {
    if (!window.MutationObserver) return
    this.observer && this.observer.disconnect()
    this.observer = new window.MutationObserver(() => {
      this.render()
    })
    this.observer.observe(this.container, {
      attributes: true,
      childList: true,
      subtree: true
    })
  }
}

export default DomMark
