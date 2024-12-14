import React, { Component } from 'react';
import { connect } from 'react-redux';
import OnImagesLoaded from "react-on-images-loaded";
import { cardImageLoaded } from '../actions/index';

class DeatlBtnContainer extends Component {
    render() {
        return (
            <div style={{ display: "none" }}>
                <OnImagesLoaded onLoaded={this.props.cardImageLoaded.bind(this)}>
                    <img src="cards/10C.svg" alt=""/>
                    <img src="cards/10D.svg" alt="" />
                    <img src="cards/10H.svg" alt="" />
                    <img src="cards/10S.svg" alt="" />
                    <img src="cards/2C.svg" alt="" />
                    <img src="cards/2D.svg" alt=""/>
                    <img src="cards/2H.svg" alt="" />
                    <img src="cards/2S.svg" alt="" />
                    <img src="cards/3C.svg" alt="" />
                    <img src="cards/3D.svg" alt="" />
                    <img src="cards/3H.svg" alt="" />
                    <img src="cards/3S.svg" alt="" />
                    <img src="cards/4C.svg" alt="" />
                    <img src="cards/4D.svg" alt="" />
                    <img src="cards/4H.svg" alt="" />
                    <img src="cards/4S.svg" alt="" />
                    <img src="cards/5C.svg" alt="" />
                    <img src="cards/5D.svg" alt="" />
                    <img src="cards/5H.svg" alt="" />
                    <img src="cards/5S.svg" alt="" />
                    <img src="cards/6C.svg" alt="" />
                    <img src="cards/6D.svg" alt="" />
                    <img src="cards/6H.svg" alt="" />
                    <img src="cards/6S.svg" alt="" />
                    <img src="cards/7C.svg" alt="" />
                    <img src="cards/7D.svg" alt="" />
                    <img src="cards/7H.svg" alt="" />
                    <img src="cards/7S.svg" alt="" />
                    <img src="cards/8C.svg" alt="" />
                    <img src="cards/8D.svg" alt="" />
                    <img src="cards/8H.svg" alt="" />
                    <img src="cards/8S.svg" alt="" />
                    <img src="cards/9C.svg" alt="" />
                    <img src="cards/9D.svg" alt="" />
                    <img src="cards/9H.svg" alt="" />
                    <img src="cards/9S.svg" alt="" />
                    <img src="cards/AC.svg" alt="" />
                    <img src="cards/AD.svg" alt="" />
                    <img src="cards/AH.svg" alt="" />
                    <img src="cards/AS.svg" alt="" />
                    <img src="cards/JC.svg" alt="" />
                    <img src="cards/JD.svg" alt="" />
                    <img src="cards/JH.svg" alt="" />
                    <img src="cards/JS.svg" alt="" />
                    <img src="cards/KC.svg" alt="" />
                    <img src="cards/KD.svg" alt="" />
                    <img src="cards/KH.svg" alt="" />
                    <img src="cards/KS.svg" alt="" />
                    <img src="cards/QC.svg" alt="" />
                    <img src="cards/QD.svg" alt="" />
                    <img src="cards/QH.svg" alt="" />
                    <img src="cards/QS.svg" alt="" />
                    <img src="cards/TC.svg" alt="" />
                    <img src="cards/TD.svg" alt="" />
                    <img src="cards/TH.svg" alt="" />
                    <img src="cards/TS.svg" alt="" />
                    <img src="cards/BLUE_BACK.svg" alt="" />

                </OnImagesLoaded>
            </div>
        );
    }
}

const mapDispatchToProps = { cardImageLoaded };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DeatlBtnContainer);