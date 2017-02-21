import React from "react";
import { render } from "react-dom";

require("./style.css");

export class StopWatch extends React.Component {
    constructor () {
        super();
        this.state = {
            secondsElapsed: 300,
            timeRan:0,
            notify: false,
            alertTime:0
        }
    }
    getSeconds () {
        return ('0'  + this.state.secondsElapsed % 60).slice(-2);
    }
    getMinutes () {
        return ('0' + Math.floor(this.state.secondsElapsed / 60)).slice(-2);
    }
    startClick () {
        this.incrementer = setInterval(()=>{
            if(this.state.secondsElapsed !== 0){
                this.setState({
            secondsElapsed: this.state.secondsElapsed -1,
            timeRan: this.state.secondsElapsed +1
        });
    }
       if(((Math.floor(this.state.secondsElapsed / 60))%(this.state.alertTime) === 0) && (this.state.secondsElapsed % 60) === 0) {
           this.setState({
                notify: true
           })
       } else if((this.state.secondsElapsed % 60) !== 59 || (this.state.secondsElapsed % 60) !== 58 && (this.state.secondsElapsed % 60) !== 57 || (this.state.secondsElapsed % 60) !== 56 || (this.state.secondsElapsed % 60) !== 55 ){
           this.setState({
                notify: false
           })
       }
    },1000)
    }
    stopClick () {
        clearInterval(this.incrementer);
        this.setState({ lastClearedIncrement : this.incrementer })
    }
    resetClick () {
        this.setState({secondsElapsed: 300, notify:false})
        if(this.state.secondsElapsed === 0){
            clearInterval(this.incrementer);
        }
    }
    lapClick () {
        this.setState({
            laps: this.state.laps.concat(this.state.secondsElapsed)
        })
    }
    setClick() {
        this.setState({secondsElapsed:((this.refs.time.value)*60)})
        console.log(this.state.secondsElapsed);
    }
    notifyClick() {
         this.setState({
            alertTime: this.refs.notifytime.value
        })
        console.log("notify time set");
    }
    
    render() {
        return (
            <div className="stopwatch">
                <div className="timer-top-frame">
                    {(this.incrementer === this.state.lastClearedIncrement)
                    ? <span><label> Set Minute</label><input ref="time" className= "inputbox-spinner" type="number" min="0" max="60" onChange={this.setClick.bind(this)} value={('0' + Math.floor(this.state.secondsElapsed / 60)).slice(-2)}/></span>
                    : null }
                     <h1 className="stopwatch-timer">{ this.getMinutes() }:{ this.getSeconds() }</h1>
                </div>
                {(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrement)
                ?<button className="btn start-btn" onClick={ this.startClick.bind(this) }>Start</button>
                :<button className="btn stop-btn" onClick={ this.stopClick.bind(this) }>Stop</button>}
                
                {(this.state.secondsElapsed !== 0 && this.incrementer === this.state.lastClearedIncrement)
                ? <button className="btn" onClick={this.resetClick.bind(this)}>Reset</button>
                : null}

                {(this.state.secondsElapsed === 30 || this.state.secondsElapsed === 29 || this.state.secondsElapsed === 28 || this.state.secondsElapsed === 27)?<p className="glyphicon glyphicon-bell gly-spin">Alert</p>:null}
                
                {(this.state.notify === true )?<p className="glyphicon glyphicon-bell gly-spin">Alert</p>:null}
                <br/>
                <span>Notify every </span>
                <input  ref="notifytime"type="number" className="notify-input" min="1" max=""/>
                <button onClick={this.notifyClick.bind(this)}>submit</button><span> Minutes</span>
                
            </div>
        )
    }
} 