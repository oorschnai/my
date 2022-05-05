import React, {Component} from "react";
import "./enter.css"
class Enter extends Component {
    render(){
        return <div className="block">
            <p>Введите имя:</p>
            <form onSubmit={this.props.enter}>
                <input type="text" name="name"/>
                <button id="enter">ОК</button>
            </form>
        </div>;
    }
}

export default Enter;
