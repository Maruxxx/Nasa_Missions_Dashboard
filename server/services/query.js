const DEFAULT_P = 1;
const DEFAULT_L = 0

function getPagination(query) {
    const page = Math.abs(query.page) || DEFAULT_P;
    const limit = Math.abs(query.limit) || DEFAULT_L;
    const skip = (page * limit) - limit;

    return {
        skip,
        limit
    }
}

module.exports = {
    getPagination,
}