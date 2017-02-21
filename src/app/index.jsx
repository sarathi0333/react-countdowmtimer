import React from "react";
import { render } from "react-dom";

import { StopWatch } from "./components/StopWatch.jsx"

class App extends React.Component {
    render() {
        return (
            <div>
                <StopWatch/>
            </div>
        )
    }
}
render(<App/>, window.document.getElementById('stop-watch'));