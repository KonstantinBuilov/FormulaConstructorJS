function getDragAfterElementXY(container, x, y) {
    const blocks = [...container.querySelectorAll('.block:not(.dragging), .brakets')]
    return blocks.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offsetX = x - box.left - box.width / 2
        const offsetY = y - box.top - box.height
        if (0 > offsetX && offsetX > closest.offsetX && 0 > offsetY && offsetY > closest.offsetY) {
            return { offsetX: offsetX, offsetY: offsetY, element: child }
        } else {
            return closest
        }
    }, { offsetX: Number.NEGATIVE_INFINITY, offsetY: Number.NEGATIVE_INFINITY }).element
}

function appendToTarget(element, target, clientX, clientY) {
    const afterElement = getDragAfterElementXY(target, clientX, clientY)
    if (afterElement == null) {
        target.appendChild(element)
    } else {
        target.insertBefore(element, afterElement)
    }
}

function animatedAppear(element) {
    element.style.transform = 'scale(0)'
    setTimeout(() => {
        element.style.transform = ''
        element.removeAttribute('style')
    }, 200)
}

export {appendToTarget, animatedAppear}