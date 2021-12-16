

import isAuth from '../utils/IsAuthContext';
import { useContext } from "react";

export function Home() {

    const { setAuthenticated } = useContext(isAuth);
    const contextValue = useContext(isAuth);

    const updateTrue = () => {
        setAuthenticated(true);
    }
    const updateFalse = () => {
        setAuthenticated(false);
    }

    const printContext = () => {
        console.log(contextValue);
    }
    return (
        <>
            <isAuth.Consumer>
                {(context) => (
                    <div>Value: {context.authenticated}</div>
                )}
            </isAuth.Consumer>
            <h1>Home</h1>

            <button onClick={updateTrue}>Set to True!</button>
            <button onClick={updateFalse}>Set to False!</button>
            <button onClick={printContext}>Console Log Context!</button>

        </>
    );
}

export default Home;