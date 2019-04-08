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
            this.props.setPictureRequestDone(true);
//console.log(response.data);
        })
        .catch(error => {
                this.changePictureMin([]);
                this.props.setAlertShow("warning", "Pictures not found");
                this.props.setPictureRequestDone(true);
//console.log(error);
            });
    };

    constructor(props) {
        super(props);

        this.changePictureMin = this.changePictureMin.bind(this);
        this.buttonSend = this.buttonSend.bind(this);
        this.rateToStars = this.rateToStars.bind(this);
        this.setMode = this.setMode.bind(this);
        this.choosePictures = this.choosePictures.bind(this);
        if (this.props.userAccess && this.props.userAccess.length > 0) this.getPictures();
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

    choosePictures() {
        let imagefile = document.querySelector('#sendPictureInput');

        let names = [];

        for (let i = 0 ; i < imagefile.files.length; i++) {
            names.push(imagefile.files[i].name);
        }

        this.props.setPictureName(names);

    }

    async buttonSend() {

        let namesArr = [];
        let descsArr = [];
        let coordsArr = [];

        let names = document.querySelectorAll('.pictureName');
        let descs = document.querySelectorAll('.pictureDesc');
        let coords = document.querySelectorAll('.pictureCoord');

        for (let i = 0; i < names.length; i++) {
            namesArr.push( names[i].value );
        }

        for (let i = 0; i < descs.length; i++) {
            descsArr.push( descs[i].value );
        }

        for (let i = 0; i < coords.length; i++) {
            coordsArr.push( coords[i].value );
        }

        let formData = new FormData();
        let imagefile = document.querySelector('#sendPictureInput');

        for( var i = 0; i < imagefile.files.length; i++ ){
            formData.append('files[' + i + ']', imagefile.files[i]);
        }

        formData.append("names", JSON.stringify(namesArr));
        formData.append("descs", JSON.stringify(descsArr));
        formData.append("coords", JSON.stringify(coordsArr));

        await axios.post(SETUP.symfonyHost + "/picture", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access': this.props.userAccess,
            }
        }).then((response) => {

            this.props.setAlertShow("success", "Picture was uploaded successfully...");
            this.props.setPictureName([]);
            document.querySelector('#sendPictureInput').value = "";

            this.getPictures();
//console.log(response);
        }).catch((error) => {
            this.props.setAlertShow("danger", error.toString());
//console.log(error);
        })
    }

    render() {

        let picturesMinList;
        const pictureMin = this.props.pictureMin;
        let that = this;

        const mode = this.props.pictureMinMode;
        const names = this.props.pictureName;

        if (!this.props.pictureRequestDone && this.props.userAccess && this.props.userAccess.length > 0) {
            picturesMinList = <p>Loading...</p>;
        } else {

//console.log(pictureMin);

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

        let namesList;
        if (names.length > 0) {
            console.log(names);
            namesList = Object.keys(names).map(function (key) {
                return <div className={"row"} key={key}>
                    <input
                        className="pictureName"
                        defaultValue={names[key]}
                        name="PictureName"
                        type="text"
                        placeholder="No name"
                    />&nbsp;
                    <input
                        className="pictureDesc"
                        name="PictureDesc"
                        type="text"
                        placeholder="No description"
                    />&nbsp;
                    <input
                        className="pictureCoord"
                        name="PictureCoord"
                        type="text"
                        placeholder="No coordinates"
                    />
                </div>
            });
        } else {

        }

        return <div className={"container"}>
            <div>
                {namesList}
                <input
                    type="file"
                    name="file"
                    multiple="multiple"
                    id="sendPictureInput"
                    onChange={this.choosePictures}
                />&nbsp;
                <button onClick={this.buttonSend}>Send</button>
            </div>
            <br/>
            <ButtonGroup name="PictureMinMode" aria-label="Basic example">
                <Button value="min" onClick={this.setMode}>Min</Button>
                <Button value="max" onClick={this.setMode}>Max</Button>
            </ButtonGroup>

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