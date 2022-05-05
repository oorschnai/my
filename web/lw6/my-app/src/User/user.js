import React, {Component} from "react";
import "./user.css"

class User extends Component {
    render(){
        let num=-1
        let name=""
        this.props.brokers.forEach((b)=>{
            if(b.id===this.props.user){
                num=b.id;
                name=b.name;
            }
        })
        if(num===-1){
            return <div>
                <p>Oops, there is no such user!</p>
                <a href="http://localhost:3000">Back</a>
            </div>;
        }
        let arr=[];
        this.props.stocks.forEach((s)=>{
            arr.push(
                <div className="stockUser">
                    <div>
                        <h5>Цена: {s.cost}</h5>
                        <h5>У брокера: {this.props.brokers[num].have[s.id]}</h5>
                        <h5>У биржи: {s.have}</h5>
                    </div>
                    <div className="buttons">
                        <button className="buysell" id={s.id} onClick={this.props.buy}>Buy</button>
                        <button className="buysell" id={s.id} onClick={this.props.sell}>Sell</button>
                    </div>
                </div>
            )
        })
        return <div id="page">
            <div className="leftUser">
                <div className="column-align">
                    <h3>Привет,</h3>
                    <h3>{name}</h3>
                </div>
                <div>
                    <h4>Изначально денег: {this.props.brokers[num].start}</h4>
                    <h4>Сейчас: {this.props.brokers[num].money}</h4>
                    <h4>Прибыль: {this.props.brokers[num].money-this.props.brokers[num].start}</h4>
                </div>
            </div>
            <div className="rightUser">
                <div className="scrollUser">
                    {arr}
                </div>
            </div>
        </div>;
    }
}

export default User;
