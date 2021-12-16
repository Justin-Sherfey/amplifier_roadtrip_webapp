import { createContext } from "react";
import { useState } from "react";

const isAuth = createContext();

export function IsAuthProvider() {
    const [authenticated] = useState(false);

    return <isAuth.Provider value={{ authenticated }} />
}

export default isAuth;
