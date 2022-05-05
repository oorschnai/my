import './App.css';
import React, {Component} from "react";
import * as io from 'socket.io-client'
import User from "./User/user"
import Enter from "./Enter/enter.js";
import Admin from "./Admin/admin.js";

let socket;

class App extends Component {
  setData(data){
    this.setState({tab: data.tab, brokers: data.brokers, stocks: data.stocks});
  }

  constructor(props) {
    super(props);
    this.state = {
      tab: "enter",
      brokers: [],
      stocks: []
    }
    this.setData = this.setData.bind(this)
  }
  enter=(event)=>{
    event.preventDefault()

    let data = event.target.elements.name.value;

    socket = io.connect('http://localhost:3030', { transports : ['websocket'] });
    socket.on('start_2',(data)=>{
      this.setData({tab: data.tab,brokers: data.brokers,stocks: data.stocks});
    });
    socket.emit('start',data);
    socket.on('connect',function(){
      console.log("Server connected!");
    });
    socket.on('update',(data)=>{
      this.setData({tab: this.state.tab,brokers: data.brokers,stocks: data.stocks});
    })
    socket.on('renew',(data)=>{
      this.setData({tab: this.state.tab,brokers: this.state.brokers,stocks: data.stocks});
    })
  }
  buy=(event)=>{
    if(this.state.stocks[event.target.id].have===0||this.state.brokers[this.state.tab].money<this.state.stocks[event.target.id].cost){
      return
    }
    this.state.brokers[this.state.tab].have[event.target.id]++;
    this.state.stocks[event.target.id].have--;
    this.state.brokers[this.state.tab].money-=this.state.stocks[event.target.id].cost;
    socket.emit('bought',{who: this.state.tab, what: event.target.id})
    this.forceUpdate()
  }
  sell=(event)=>{
    if(this.state.brokers[this.state.tab].have[event.target.id]===0){
      return
    }
    console.log(this.state.tab+" Sold "+event.target.id);
    this.state.brokers[this.state.tab].have[event.target.id]--;
    this.state.stocks[event.target.id].have++;
    this.state.brokers[this.state.tab].money+=this.state.stocks[event.target.id].cost;
    socket.emit('sold',{who: this.state.tab, what: event.target.id})
    this.forceUpdate()
  }

  startstop=()=>{
    socket.emit('startstop');
  }

  getRendPage() {
    if (this.state.tab === "enter") {
      return <Enter
          enter={this.enter}
      />
    } else {
      if (this.state.tab === "admin") {
        return <Admin
            brokers={this.state.brokers}
            stocks={this.state.stocks}
            startstop={this.startstop}
        />
      } else {
        return <User
            user={this.state.tab}
            brokers={this.state.brokers}
            stocks={this.state.stocks}
            buy={this.buy}
            sell={this.sell}
        />
      }
    }
  }

  render(){
    return this.getRendPage();
  }
}

export default App;
