import { createBraketsBlock, createNumberBlock, createSignBlock } from './script/formulaBlocks.js'
import { appendToTarget, animatedAppear } from './script/formulaFuncs.js'
import { formulaToString, stringToFormula, formulaToObject, objectToFormula } from './script/formulaConverters.js'
import { styleComponent } from './script/formulaStyler.js'

class FormulaConstructor {
    #signArray = []
    #listenerArray = []

    constructor(order = 'input,buttons,constructor,result') {
        document.head.appendChild(styleComponent())
        this.container = document.querySelector('.fcontainer') || this.#buildContainer()
        order.replace(/\s/g, '').split(',').forEach(name => {
            switch (name) {
                case 'constructor':
                    this.constructor = this.#addConstructor()
                    this.container.appendChild(this.constructor)
                    break
                case 'buttons':
                    this.buttons = this.#addButtons()
                    this.container.appendChild(this.buttons)
                    break
                case 'input':
                    this.input = this.#addInput()
                    this.container.appendChild(this.input)
                    break
                case 'result':
                    this.result = this.#addResult()
                    this.container.appendChild(this.result)
            }
        })
        if (!order.includes('constructor')) {
            this.constructor = this.#addConstructor()
            this.container.appendChild(this.constructor)
        }
    }

    #buildContainer = () => {
        const container = document.createElement('div')
        container.classList.add('fcontainer')
        document.body.appendChild(container)
        return container
    }

    #addConstructor = () => {
        const constructor = document.createElement('div')
        constructor.classList.add('fconstructor')
        const dragOverEvent = constructor.addEventListener('dragover', this.#dragOver.bind(this))
        const dragStartEvent = constructor.addEventListener('dragstart', this.#dragStart.bind(this))
        const dragEndEvent = constructor.addEventListener('dragend', this.#dragEnd.bind(this))
        const keyUpEvent = constructor.addEventListener('keyup', this.#checkInput.bind(this))
        this.#listenerArray.push({ element: constructor, event: 'dragover', listener: dragOverEvent },
            { element: constructor, event: 'dragstart', listener: dragStartEvent },
            { element: constructor, event: 'dragend', listener: dragEndEvent },
            { element: constructor, event: 'keyup', listener: keyUpEvent })
        return constructor
    }

    #addInput = () => {
        const input = document.createElement('input')
        input.classList.add('finput')
        input.type = 'text'
        input.placeholder = 'input formula'
        const inputEvent = input.addEventListener('keyup', this.#inputToConstructor.bind(this))
        this.#listenerArray.push({ element: input, event: 'keyup', listener: inputEvent })
        return input
    }

    #addButtons = () => {
        const buttons = document.createElement('fbuttons')
        buttons.innerHTML = `<button id="number" class="fbutton">Add number</button>
        <button id="brakets" class="fbutton">Add brakets</button>
        <button id="clear" class="fbutton">Clear</button>`
        const buttonsEvent = buttons.addEventListener('click', this.#buttonClick.bind(this))
        this.#listenerArray.push({ element: buttons, event: 'click', listener: buttonsEvent })
        return buttons
    }

    #addResult = () => {
        const result = document.createElement('label')
        result.classList.add('fresult')
        result.textContent = 'Result: 0'
        return result
    }

    #inputToConstructor = (e) => {
        this.importClearFormula(e.target.value)
        if (this.result)
            this.#calcResult(e.target.value)
    }

    #calcResult = (input) => {
        if (input.match(/([0-9]|\))$/)) {
            this.result.textContent = 'Result: ' + eval(input.replace('=', '==').replace('<>', '!=')).toString()
        } else if (input == '') {
            this.result.textContent = 'Result: 0'
        }
    }

    #buttonClick = (e) => {
        switch (e.target.id) {
            case 'number':
                this.addNumber()
                break
            case 'brakets':
                this.addBrakets()
                break
            case 'clear':
                this.clear()
                break
        }
    }

    #addElement = (type) => {
        if (this.constructor.childElementCount > 0) {
            const sign = createSignBlock('')
            animatedAppear(sign)
            this.constructor.appendChild(sign)
        }
        const block = type == 'number' ? createNumberBlock() : createBraketsBlock()
        animatedAppear(block)
        this.constructor.appendChild(block)
    }

    #dragOver = (e) => {
        e.preventDefault()
        const dragging = this.constructor.querySelector('.dragging')
        if (e.target != dragging) {
            const parent = e.target.className == ('block' || 'sign') ? e.target.parentElement : e.target
            appendToTarget(dragging, parent, e.clientX, e.clientY)
        }
    }

    #dragStart = (e) => {
        if (e.target.className == 'block' || e.target.className == 'brakets') {
            e.target.classList.add('dragging')
            e.dataTransfer.effectAllowed = e.dataTransfer.dropEffect = 'move'
            this.#cutSigns()
        }
    }

    #dragEnd = (e) => {
        if (e.dataTransfer.dropEffect == 'none') {
            e.target.parentElement.removeChild(e.target)
        } else {
            e.target.classList.remove('dragging')
        }
        this.#putSigns()
        if (this.input) this.input.value = this.exportClearFormula()
        if (this.result) this.#calcResult(this.exportClearFormula())
    }

    #cutSigns = () => {
        this.constructor.querySelectorAll('.block, .brakets').forEach(el => {
            if (el != el.parentElement.lastElementChild) {
                const sign = el.nextElementSibling
                this.#signArray.push({ id: el.id, value: sign.value })
                sign.style.transform = 'scale(0)'
                setTimeout(() => sign.parentElement.removeChild(sign), 200)
            }
        })
    }

    #putSigns = () => {
        this.constructor.querySelectorAll('.block, .brakets').forEach(el => {
            if (el != el.parentElement.lastElementChild) {
                let sign = this.#signArray.find(x => x.id == el.id) || { value: '' }
                const signBlock = createSignBlock(sign.value)
                animatedAppear(signBlock)
                el.parentElement.insertBefore(signBlock, el.nextElementSibling)
            }
        })
        this.#signArray = []
    }

    #checkInput = (e) => {
        if (e.target.className == 'sign') {
            let input = e.target.value;
            let regex = new RegExp('^([+-/\*]{1})$|^([<>=]{1,2})$')
            if (!regex.test(input)) {
                e.target.value = ''
            }
        }
        if (this.input) this.input.value = this.exportClearFormula()
        if (this.result) this.#calcResult(this.exportClearFormula())
    }

    //Public functions
    importJSONFormula(formula) {
        this.constructor.innerHTML = ''
        const formulaObject = JSON.parse(formula)
        objectToFormula(formulaObject, this.constructor)
    }

    importClearFormula(formula) {
        this.constructor.innerHTML = ''
        stringToFormula(formula, this.constructor)
    }

    exportJSONFormula() {
        const formula = formulaToObject(this.constructor.children)
        return JSON.stringify(formula)
    }

    exportClearFormula() {
        return formulaToString(this.constructor.children)
    }

    addBrakets() {
        this.#addElement('brakets')
    }

    addNumber() {
        this.#addElement('number')
    }

    clear() {
        this.constructor.innerHTML = ''
        if (this.input) this.input.value = ''
        if (this.result) this.result.textContent = 'Result: 0'
    }

    destroy() {
        this.#listenerArray.forEach(({ element, event, listener }) => {
            element.removeEventListener(event, listener)
        })
        this.container.parentElement.removeChild(this.container)
    }
}