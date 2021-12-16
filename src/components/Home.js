

import isAuth from '../utils/IsAuthContext';
import useContext from "react";

export function Home() {

    const { setAuthenticated } = useContext(isAuth);
    const update = () => {
        setAuthenticated(true);
    }

    return (
        <isAuth.Consumer>
            {(context) => (<><div>Test: {context.authenticated}</div>
                <button onClick={function () { console.log(context.authenticated) }}>Click!</button></>
            )}
            <h1>Home</h1>

            <button onClick={update}>Click!</button>
        </isAuth.Consumer>

    );
}

export default Home;