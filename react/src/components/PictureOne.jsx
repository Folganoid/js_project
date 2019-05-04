import React from 'react';
import axios from "axios";
import SETUP from "../config.jsx";

class PictureOne extends React.Component {

    constructor(props) {
        super(props);
        this.getPicture = this.getPicture.bind(this);
        this.changePicture = this.changePicture.bind(this);

        //clear
        this.changePicture("");
    }

    changePicture(body) {
        this.props.setPictureOne(body);
    }

    getPicture(bucket, key) {
        axios.get(SETUP.symfonyHost + "/picture/" + bucket + "/" + key, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access': this.props.userAccess,
            }
        }).then((response) => {
            if (response.data !== undefined) this.changePicture(response.data['body']);
            else this.changePicture("");
        })
            .catch(error => {
                this.changePicture("");
                this.props.setAlertShow("danger", error.toString());
//console.log(error);
            });
    };

    render() {

        this.getPicture(this.props.match.params.user, this.props.match.params.pictureId);

        const pictureOne = this.props.pictureOne;
        let picture;


        if (pictureOne === "") picture = <h1>loading...</h1>;
        else picture = <img
            style={{width: "100%"}}
            src={`data:image/jpeg;base64,${pictureOne}`}
            alt={this.props.match.params.user + "/" + this.props.match.params.pictureId}
        />;

//console.log(this.props.match);

        return <div>
            {picture}
        </div>;

    }
}

export default PictureOne;