function rewindDate(direction, period){
    let params = GETParamsAsObject()
    let date = new Date()

    if ('date' in params){
        const [year, month, day] = params.date.split('-').map((x)=>parseInt(x,10))
        date = new Date(year, month-1, day)
    }

    if (direction === 'next'){
        date = new Date(date.getTime() + 1000*60*60*24*period)
    } else if (direction === 'prev'){
        date = new Date(date.getTime() - 1000*60*60*24*period)
    }

    params.date = formatDate(date)
    const search = Object.keys(params).reduce((acc, val) => `${acc}${val}=${params[val]}&`, '?')
    window.location.search = search.slice(0, -1)
}

function formatDate (date){
    let day = date.getDate() < 10 ? // дни возвращает от 1
        "0" + date.getDate().toString()
        : date.getDate().toString();
    let month = date.getMonth() + 1 < 10 ? // месяцы возвращает от 0
        "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString();

    return [year, month, day].join('-')
}
function GETParamsAsObject() {
    let searchString = window.location.search.slice(1) //вытаскиваем get параметры, slice(1) обрезаем '?'
    if (searchString === '') {
        return {}
    }
    return Object.fromEntries(searchString.split('&').map(item => item.split('='))) // получаем массив строк, который состоит из списка {переменная, значение}
    // Object.fromEntries собирает этот список списков в словарь
}

$("#save").click(()=>{
    let id = $('#id').html();
    let name = $('#name').val();
    let description = $('#description').val();
    $.ajax({
        type: "POST",
        url: window.location.origin + window.location.pathname,
        data: {id, name, description},
        success: (html)=>{
            console.log(html);
            window.location.replace(window.location.origin + window.location.pathname);
        }
    });
    return false;
})

$("#HomeWorkSave").click(()=>{
    let id = $().
    let homework = $('#HWText').val();
    $.ajax({
        type: "POST",
        url: window.location.origin + window.location.pathname,
        data: {homework},
        success: (html)=>{
            console.log(html);
            window.location.replace(window.location.origin + window.location.pathname);
        }
    });
    $('#HomeWorkSave').modal('toggle')
    return false;
})

$('#myModal').on('show.bs.modal', function (e) {

})
