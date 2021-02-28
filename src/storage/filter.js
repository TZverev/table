function filterFunc(state) {
    function findInItem(item) {
        for (let key in item) {
            if (item[key].toString().includes(state.filter)) {
                return true
            }
        }
    }

    if (state.data.length) {
        return state.data.filter((item) => { return findInItem(item) });
    }
    return state.data
}

export default filterFunc;