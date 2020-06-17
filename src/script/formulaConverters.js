import { createBraketsBlock, createNumberBlock, createSignBlock } from './formulaBlocks.js'

const formulaToString = (elements) => {
    return [...elements].reduce((result, el) => {
        switch (el.getAttribute('type')) {
            case 'text':
                return result + el.value
            case 'number':
                return result + el.value
            case 'brakets':
                return result + '(' + formulaToString(el.children) + ')'
        }
    }, '')
}

const stringToFormula = (input, parent) => {
    if (input) {
        input.match(/(\d*\.\d+)|(\d+)|([\+\-\*\/])|([!<=>](=|))|\(.*\)/g).forEach(item => {
            if (item.match(/\(.*\)/)) {
                const brakets = createBraketsBlock()
                stringToFormula(item.substring(1, item.length - 1), brakets)
                parent.appendChild(brakets)
            } else if (item.match(/[0-9]/)) {
                const number = createNumberBlock(item)
                parent.appendChild(number)
            } else if (item.match(/([\+\-\*\/])|([!<=>](.|))/)) {
                const sign = createSignBlock(item)
                parent.appendChild(sign)
            }
        })
    }
}

const formulaToObject = (elements) => {
    return [...elements].map(el => {
        switch (el.getAttribute('type')) {
            case 'text':
                return {
                    type: 'sign',
                    value: el.value
                }
            case 'number':
                return {
                    type: 'number',
                    value: el.value
                }
            case 'brakets':
                return {
                    type: 'brakets',
                    value: formulaToObject(el.children)
                }
        }
    })
}

const objectToFormula = (formulaObject, parent) => {
    formulaObject.forEach(el => {
        switch (el.type) {
            case 'sign':
                parent.appendChild(createSignBlock(el.value))
                break
            case 'number':
                parent.appendChild(createNumberBlock(el.value))
                break
            case 'brakets':
                const braket = createBraketsBlock()
                objectToFormula(el.value, braket)
                parent.appendChild(braket)
                break
        }
    })
}

export { formulaToString, stringToFormula, formulaToObject, objectToFormula }
