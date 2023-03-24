import React from "react";

export default function errorsMensage(errorId: number) {

    if ( errorId === 409 ) {
        return alert("This email has already been registered, try another one!");
    }

    if ( errorId === 400 || errorId === 500 ) {
        return alert("We are having connection problems, please try again later!!")
    }

    if ( errorId === 404 ) {
        return alert("email not registered")
    }

    if ( errorId === 401 ) {
        return alert("invalid password");
    }

    return alert("We are having problems, please try again later.");
}