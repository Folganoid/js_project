import React from 'react';

class PictureOneContainer extends React.Component {

    render() {

        console.log(this.props.match);

        return <div>
            <h1>{this.props.match.params.user}</h1>
            <h1>{this.props.match.params.pictureId}</h1>
        </div>;

    }
}

export default PictureOneContainer;