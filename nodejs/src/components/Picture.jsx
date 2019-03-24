import React from 'react';
import axios from "axios";
import SETUP from "../config";
import {Link} from "react-router-dom";
import {Row, Col, Button, ButtonGroup} from "react-bootstrap";

/**
 * Picture
 */
class Picture extends React.Component {

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

    constructor(props) {
        super(props);

        this.changePictureMin = this.changePictureMin.bind(this);
        this.buttonSend = this.buttonSend.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.rateToStars = this.rateToStars.bind(this);
        this.setMode = this.setMode.bind(this);
        this.getPictures();
    }

    rateToStars(rate) {

        let res = "";
        for (let i = 1; i <= 5; i++) {
            if (+rate >= i) res += "★";
            else res += "☆"
        }
        return res;
    }

    changePictureMin(pictureMin) {
        this.props.setPictureMin(pictureMin);
    }

    setMode(event) {
        this.props.setPictureMinMode(event.target.value);
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

    render() {

        let picturesMinList;
        const pictureMin = this.props.pictureMin;
        let that = this;

        const mode = this.props.pictureMinMode;

        if (pictureMin.length === 0) {
            console.log("---");
            picturesMinList = <p>Loading...</p>;
        } else {
            console.log("+++");
            console.log(pictureMin);

            picturesMinList = Object.keys(pictureMin).map(function (key) {

                const rate = (pictureMin[key].rate) ?
                    <dd>{that.rateToStars(pictureMin[key].rate) + " " + (+pictureMin[key].rate).toFixed(2) + " / " + pictureMin[key].rateCount}</dd> :
                    <dd/>;

                if (mode === "min") {
                    return <Col xs={4} md={3} lg={2} className="thumbnail" key={key}>

                        <Link to={`/pictures/${pictureMin[key].s3Link}`}>
                            <img
                                style={{display: 'block', maxWidth: '150px', maxHeight: '150px'}}
                                src={`data:image/jpeg;base64,${pictureMin[key].body}`}
                                alt={pictureMin[key].description}
                            />
                        </Link>

                        <div className="thumbnail_text">
                            {rate}
                            <dd><b>{pictureMin[key].name}</b></dd>
                            <dd>{pictureMin[key].description}</dd>
                            <dd>{pictureMin[key].rateCount}</dd>

                        </div>
                    </Col>
                } else if (mode === "max") {
                    return <Col xs={12} md={12} lg={12} key={key} className="thumbnail">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <Link to={`/pictures/${pictureMin[key].s3Link}`}>
                                        <img
                                            style={{display: 'block', maxWidth: '150px', maxHeight: '150px'}}
                                            src={`data:image/jpeg;base64,${pictureMin[key].body}`}
                                            alt={pictureMin[key].description}
                                        />
                                    </Link>
                                </td>
                                <td>
                                    <div className="thumbnail_text">
                                        <dd><b>{pictureMin[key].name}</b></dd>
                                        <dd>{pictureMin[key].description}</dd>
                                        {rate}

                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Col>


                }
            })
        }

        return <div>
            <div className={"container"}>
                <input
                    value={this.props.pictureName}
                    name="PictureName"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="No name"
                />&nbsp;
                <input
                    value={this.props.pictureDesc}
                    name="PictureDesc"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="No description"
                />&nbsp;
                <input
                    value={this.props.pictureCoord}
                    name="PictureCoord"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="No coordinates"
                />&nbsp;
                <input
                    type="file"
                    name="file"
                    id="sendPictureInput"
                />&nbsp;
                <button onClick={this.buttonSend}>Send</button>
            </div>
            <br/>
            <ButtonGroup name="PictureMinMode" aria-label="Basic example">
                <Button value="min" onClick={this.setMode}>Min</Button>
                <Button value="max" onClick={this.setMode}>Max</Button>
            </ButtonGroup>;

            <br/>

            <div className="container">
                <Row className="show-grid">
                    {picturesMinList}
                </Row>
            </div>
        </div>

    }

}

export default Picture