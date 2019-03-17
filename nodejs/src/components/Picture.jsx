import React from 'react';
import axios from "axios";
import SETUP from "../config";

/**
 * Picture
 */
class Picture extends React.Component {

    constructor(props) {
        super(props);

        this.changePictureMin = this.changePictureMin.bind(this);
        this.buttonSend = this.buttonSend.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.rateToStars = this.rateToStars.bind(this);
        this.getPictures();
    }

    rateToStars(rate) {

        let res = "";
        for (let i = 1 ; i <= 5 ; i++) {
            if (+rate >= i) res += "★";
            else res += "☆"
        }
        return res;
    }


    changePictureMin(pictureMin) {
        this.props.setPictureMin(pictureMin);
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
        formData.append("name", this.props.pictureName);
        formData.append("desc", this.props.pictureDesc);
        formData.append("coord", this.props.pictureCoord);
        axios.post(SETUP.symfonyHost + "/picture", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access': this.props.userAccess,
            }
        }).then((response) => {
            this.getPictures();
            //console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    getPictures = async () => {
        await axios.get(SETUP.symfonyHost + "/picture", {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access': this.props.userAccess,
            }
        }).then((response) => {
            if (response.data !== undefined) this.changePictureMin(response.data);
            else this.changePictureMin([]);
            //console.log(response.data);
        })
            .catch(error => {
                this.changePictureMin([]);
                console.log(error);
            });
    };

    render() {

        let picturesMinList;
        const pictureMin = this.props.pictureMin;
        let that = this;

        if (pictureMin === null) {
            picturesMinList = <p>Loading...</p>;
        } else {
            console.log(pictureMin);

            picturesMinList = Object.keys(pictureMin).map(function (key) {

                const rate = (pictureMin[key].rate) ? <dd>{that.rateToStars(pictureMin[key].rate) + " " + (+pictureMin[key].rate).toFixed(2) + " / " + pictureMin[key].rateCount}</dd> : <dd />;

                //return <img style={{display: 'block', width: '150px', height: '150px'}} key={path} src={`data:image/jpeg;base64,${path}`} />
                return <div className="thumbnail" key={key}>
                    <img
                         style={{display: 'block', maxWidth: '150px', maxHeight: '150px'}}
                         src={`data:image/jpeg;base64,${pictureMin[key].body}`}
                    />
                    <div className="thumbnail_text">
                        {rate}
                        <dd><b>{pictureMin[key].name}</b></dd>
                        <dd>{pictureMin[key].description}</dd>
                        <dd>{pictureMin[key].rateCount}</dd>

                    </div>
                </div>
            })
        }

        return <div>
            <div>
                <input
                    value={this.props.pictureName}
                    name="PictureName"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="No name"
                /><br />
                <input
                    value={this.props.pictureDesc}
                    name="PictureDesc"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="No description"
                /><br />
                <input
                    value={this.props.pictureCoord}
                    name="PictureCoord"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="No coordinates"
                /><br />
                <input
                    type="file"
                    name="file"
                    id="sendPictureInput"
                /><br />
            </div>
            <button onClick={this.buttonSend}>Send</button>

            <div className="container">
                <div className="row pictureMin">
                    <div className="col-md-12 pictureMinBody">
                        {picturesMinList}
                    </div>
                </div>
            </div>
        </div>

    }

}

export default Picture