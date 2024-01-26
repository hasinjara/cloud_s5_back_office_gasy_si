import React, { Component } from "react";
class BoiteDeDiscusion extends Component {
    constructor(props, Message) {
        super(props);
        this.state = {
            message: Message
        };
    }

    render() {
        return (
            <p>{this.state.message}</p>
        );
    }
}
export default BoiteDeDiscusion