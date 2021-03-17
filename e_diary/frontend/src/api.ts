import { Moment } from "moment";

const BASE_API_URL  = 'http://127.0.0.1:8000/api'

export async function loadSchedule() {
    return fetch(`${BASE_API_URL}/schedule/load`, {credentials: 'same-origin'})
        .then(resp => resp.json());
}

export async function lessonsAndClassesListGet() {
    return fetch(`${BASE_API_URL}/lessonsandclasses/list/get`, {credentials: 'same-origin'})
        .then(resp => resp.json());
}

export async function updateHomework(lessonId: number, homework: string) {
    return fetch(`${BASE_API_URL}/homework/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({lessonId, homework}),
        credentials: 'same-origin'
    })
        .then(resp => resp.json());
}

export async function getGradeList(lesson: string) {
    return fetch(`${BASE_API_URL}/grade_list/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({lesson}),
        credentials: 'same-origin'
    })
        .then(resp => resp.json());
        
}

export async function updateComment(lessonId: number, comment: string) {
    return fetch(`${BASE_API_URL}/comment/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({lessonId, comment}),
        credentials: 'same-origin'
    })
        .then(resp => resp.json());
}

export async function getUsername() {
    return fetch(`${BASE_API_URL}/user/get-name`, {credentials: 'same-origin'})
        .then(resp => resp.json());
}

export async function getWeekTimetable(date: Moment) {
    return fetch(`${BASE_API_URL}/schedule/week?date=${date.format("YYYY-MM-DD")}`, {credentials: 'same-origin'})
        .then(resp => resp.json());
}

export async function getDayTimetable(date: Moment) {
    return fetch(`${BASE_API_URL}/schedule/day?date=${date.format("YYYY-MM-DD")}`, {credentials: 'same-origin'})
        .then(resp => resp.json());
}

export async function getGradesValue() {
    return fetch(`${BASE_API_URL}/grade/value`, {credentials: 'same-origin'})
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