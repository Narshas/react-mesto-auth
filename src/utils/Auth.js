class Auth {
    constructor(baseUrl){
        this._baseUrl = baseUrl;
    }

    _testRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register({ password, email }) {
        return fetch(`${this._baseUrl}/signup`, { 
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({password, email})
        })
        .then(res => this._testRes(res))
    }

    authorizer({ password, email }) {
        return fetch(`${this._baseUrl}/signin`, { 
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({password, email})
        })
        .then(res => this._testRes(res))
    }

    tokenCheker() {

    }

}

export const auth = new Auth('https://auth.nomoreparties.co')