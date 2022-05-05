import React, {Component} from "react";
import "./admin.css"
class Admin extends Component {
    setData(data){
        this.setState({title: data.title,st: data.st})
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "Главная",
            st: true
        }
        this.setData = this.setData.bind(this)
    }
    render(){
        return <div id="page">
            <div className="left">
                <h1>{this.state.title}</h1>
                <button className="choose" onClick={this.change}>{this.state.title==="Акции"?"Брокеры":"Акции"}</button>
                <button className="choose" onClick={this.changestop}>{this.state.st?"Старт":"Стоп"}</button>
            </div>
            <div className="right">
                {this.getRendInfo()}
            </div>
        </div>;
    }
    getRendInfo(){
        if(this.state.title==="Брокеры"){
            let arr=[]
            this.props.brokers.forEach((b) => {
                arr.push(
                    <div className="broker">
                        <h2>Имя: {b.name}</h2>
                        <h2>Деньги: {b.money}</h2>
                    </div>
                )
            })
            return <div className="scroll">
                {arr}
            </div>
        }
        if(this.state.title==="Акции"){
            let arr=[]
            this.props.stocks.forEach((b) => {
                arr.push(
                    <div className="stock">
                        <h2>Закон: {b.rule===0?"Нормальный":"Равномерный"}</h2>
                        <h2>Макс: {b.max}</h2>
                        <h2>Есть: {b.have}</h2>
                        <h2>Цена: {b.cost}</h2>
                    </div>
                )
            })
            return <div className="scroll">
                {arr}
            </div>
        }
    }
    change=()=>{
        if(this.state.title==="Акции"){
            this.setData({title: "Брокеры",st: this.state.st});
        }else{
            this.setData({title: "Акции",st: this.state.st});
        }
    }
    changestop=()=>{
        if(this.state.st){
            this.setData({title: this.state.title,st: false});
        }else{
            this.setData({title: this.state.title,st: true});
        }
        this.props.startstop();
    }
}

export default Admin;
