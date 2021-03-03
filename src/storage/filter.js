function filterFunc(state, filter) {
    function findInItem(item) {
        for (let key in item) {
            if (item[key].toString().includes(filter)) {
                return true
            }
        }
    }
    if (state.length) {
        return state.filter((item) => { return findInItem(item) });
    }
    return state
}

export default filterFunc;