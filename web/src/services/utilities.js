export const dateSort = (array) => {
    array.sort((a, b) => new Date(a.date) - new Date(b.date))
    return array.map((obj, index) => ({...obj, position: index}))
}