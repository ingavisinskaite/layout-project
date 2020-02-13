export const validateForm = (widget) => {
    for (let prop of widget.keys) {
        if (widget[prop] === null || widget.prop === "") {
            return false
        } else {
            return true
        }
    }
}