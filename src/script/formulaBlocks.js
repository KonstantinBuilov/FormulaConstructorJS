HTMLElement.prototype.setAttributes = function (args) {
    Object.keys(args).forEach(attr => this.setAttribute(attr, args[attr]))
}

function createNumberBlock(value = '') {
    const numberBlock = document.createElement('input')
    numberBlock.setAttributes({
        id: Date.now() + Math.trunc(Math.random() * 100),
        class: 'block',
        type: 'number',
        draggable: true,
        value
    })
    return numberBlock
}

function createSignBlock(value = '') {
    const signBlock = document.createElement('input')
    signBlock.setAttributes({
        class: 'sign',
        type: 'text',
        value
    })
    return signBlock
}

function createBraketsBlock() {
    const braketsBlock = document.createElement('div')
    braketsBlock.setAttributes({
        id: Date.now() + Math.trunc(Math.random() * 100),
        class: 'brakets',
        type: 'brakets',
        draggable: true
    })
    return braketsBlock
}

export {createBraketsBlock, createNumberBlock, createSignBlock}