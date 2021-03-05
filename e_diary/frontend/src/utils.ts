
export const formatDate = (date: Date): string => {
    let day: string = date.getDate() < 10 ?
        "0" + date.getDate().toString()
        : date.getDate().toString();
    let month: string = date.getMonth() + 1 < 10 ?
        "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString();
    let year: string = date.getFullYear().toString();

    return [year, month, day].join('-')
}
