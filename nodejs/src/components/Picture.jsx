import React from 'react';
import axios from "axios";
import SETUP from "../config";

/**
 * Picture
 */
class Registration extends React.Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.buttonSend = this.buttonSend.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = "set" + target.name;

        this.props[name](value);
    }

    buttonSend() {

        let formData = new FormData();
        let imagefile = document.querySelector('#sendPictureInput');
        formData.append("file", imagefile.files[0]);
        axios.post(SETUP.symfonyHost + "/picture", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access': this.props.userAccess,
            }
        }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })
    }

    render() {

        const {userLogin, userAccess} = this.props;

        return <div>
            <div>
                <input
                    type="file"
                    name="file"
                    id="sendPictureInput"
                />
            </div>
            <button onClick={this.buttonSend}>Send</button>

            <div>
                {userLogin}
                {userAccess}
            </div>
        </div>
    }

}

export default Registration