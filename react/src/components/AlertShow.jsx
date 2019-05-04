import React from 'react';
import {Alert} from "react-bootstrap";

class AlertShow extends React.Component {

    constructor(props) {
        super(props);

        this.buildAlerts = this.buildAlerts.bind(this);
    }

    buildAlerts() {

        let that = this;

        return Object.keys(that.props.alertShow).map(function (key) {
            setTimeout(() => {that.props.eraseAlertShow();}, 5000);
            return <Alert
                className="alertShow"
                style={{top: 60 + key*53+"px", width: "30%", height: "50px", position: "fixed", right: "5px", zIndex: "1000", opacity: "0.8"}}
                key={key}
                variant={that.props.alertShow[key].type}
            >
                {that.props.alertShow[key].message}
            </Alert>
        });

    }

    render() {
        return <div>{this.buildAlerts()}</div>;
    }
}

export default AlertShow