
let baseUrl = 'http://ec2-18-220-101-85.us-east-2.compute.amazonaws.com/eventApp/creative-project-module7-512518/backend/public';

let csrfToken = null;

// Fetch CSRF token on module load
// Pass to header field x-csrf-token for state changing requests
// Source: https://laravel.com/docs/12.x/csrf#csrf-x-csrf-token
function getCsrfToken() {
    return fetch(`${baseUrl}/token`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
        csrfToken = data.token;
        return csrfToken;
    })
    .catch(error => { console.error('Error:', error)});
}

export function getSession() {
    return getCsrfToken().then(() => {
        return fetch(`${baseUrl}/checkSession`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .catch(error => { console.error('Error:', error)});
    });
}

    
    


export function register(data) {

    return getCsrfToken().then((csrfToken) => {
        return fetch(`${baseUrl}/Register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .catch(error => { console.error('Error:', error)});
    });
}

export function login(data) {
    return getCsrfToken().then((csrfToken) => {
        return fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .catch(error => { console.error('Error:', error)});
    });

}

export function logout() {
    return fetch(`${baseUrl}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function deleteAccount() {
    return fetch(`${baseUrl}/deleteAccount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function getEvents(options = {}) {
    
    let {search, date, creator} = options;
    let url = `${baseUrl}/events`;
    let params = [];

    if (search) {
        params.push(`search=${encodeURIComponent(search)}`);
    }
    if (date) {
        params.push(`date=${encodeURIComponent(date)}`);
    }
    if (creator) {
        params.push(`creator=${encodeURIComponent(creator)}`);
    }
    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }
    return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function getEventById(eventId) {
    return fetch(`${baseUrl}/event/${eventId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function addEvent(data) {
    return fetch(`${baseUrl}/addEvent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function updateEvent(eventId, data) {
    return fetch(`${baseUrl}/updateEvent/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function deleteEvent(eventId) {
    return fetch(`${baseUrl}/deleteEvent/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function registerForEvent(eventId, data) {
    return fetch(`${baseUrl}/registerForEvent/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function unregisterFromEvent(eventId) {
    return fetch(`${baseUrl}/unregister/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function getEventRegistrations(eventId) {
    return fetch(`${baseUrl}/eventRegistrations/${eventId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function getEventComments(eventId) {
    return fetch(`${baseUrl}/eventComments/${eventId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function postEventComment(eventId, data) {
    return fetch(`${baseUrl}/postEventMessage/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function getPrivateMessages() {
    return fetch(`${baseUrl}/privateMessages`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function sendPrivateMessage(receiverId, data) {
    return fetch(`${baseUrl}/sendPrivateMessage/${receiverId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function getPrivateMessagesWithUser(otherUserId) {
    return fetch(`${baseUrl}/privateMessages/${otherUserId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function getPlannerInfo() {
    return fetch(`${baseUrl}/plannerInfo`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}

export function getSeekerInfo() {
    return fetch(`${baseUrl}/seekerInfo`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .catch(error => { console.error('Error:', error)});
}