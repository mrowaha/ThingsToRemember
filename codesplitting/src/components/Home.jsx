import React, {lazy, Suspense, useTransition} from 'react'
import { useState } from "react";
//import {AdminData} from './AdminData';
// import {sum} from '../sum';

const AdminData = lazy(() => {
    return wait(1000)
        .then(() => {return import("./AdminData")})
        .then(module => {return {default : module.AdminData}})
})

export default function Home() {
    const [isAdmin, setIsAdmin] = useState(false);

    const [isPending, startTransition] = useTransition();

    return (
        <>
            <h1>Home</h1>
            <button onClick={() => {
                import("../sum.js").then(module => {
                    alert(module.sum(2, 2));
                })}}
            >Add 2 + 2</button>
            <br />
            <br />
            <button onClick={ () =>
                startTransition(() => {
                    setIsAdmin(prev => !prev)
                })
            }>
                Toggle Admin
            </button>

            {isPending &&  "Loading..."}
            <Suspense fallback={<h2>Loading...</h2>}>
                {isAdmin? <AdminData /> : <h2>Not Admin</h2>}
            </Suspense>
        </>
    )
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}