const BASE_API_URL  = 'http://127.0.0.1:8000/api'

export async function getHomework(lessonId: number) {
    return fetch(`${BASE_API_URL}/api/homework/get?lesson_id=${lessonId}`)
        .then(resp => resp.json());
}

export async function updateHomework(lessonId: number) {
    return fetch(`${BASE_API_URL}/homework/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: '',
    })
        .then(resp => resp.json());
}

export async function getComment(lessonId: number) {
    return fetch(`${BASE_API_URL}/comment/get?lesson_id=${lessonId}`)
        .then(resp => resp.json());
}

export async function updateComment(lessonId: number) {
    return fetch(`${BASE_API_URL}/comment/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: '',
    })
        .then(resp => resp.json());
}

export async function getUsername(userId: number) {
    return fetch(`${BASE_API_URL}/user/get-name?user_id=${userId}`)
        .then(resp => resp.json());
}

export async function getWeekTimetable(userId: number) {
    return fetch(`${BASE_API_URL}/schedule/week?user_id=${userId}`, {credentials: 'include'})
        .then(resp => resp.json());
}

export async function getDayTimetable(userId: number) {
    return fetch(`${BASE_API_URL}/schedule/day?user_id=${userId}`)
        .then(resp => resp.json());
}

export async function getGrades() {
    return fetch(`${BASE_API_URL}/api/grade/get`)
        .then(resp => resp.json());
}

export async function updateGrades() {
    return fetch(`${BASE_API_URL}/grade/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: '',
    })
        .then(resp => resp.json());
}