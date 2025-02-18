import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { newHand, dealNextCards, revealCards, subtractCredits, addCredits } from '../actions/index';

class DealBtnContainer extends Component {
    handleButton() {
        if (this.props.roundEnded) {
            this.props.subtractCredits();
            this.props.newHand();
            this.props.revealCards();
        } else {
            this.props.dealNextCards();
            this.props.revealCards();
        }
    }

    render() {
        return (
            <button onClick={this.handleButton.bind(this)} className={this.props.roundEnded ? "flash" : "" }>DEAL</button>
        );
    }
}

const mapDispatchToProps = { newHand, dealNextCards, revealCards, subtractCredits, addCredits };

const mapStateToProps = (state) => ({
    roundEnded: state.game.roundEnded,
    handWin: state.game.handWin
});

export default connect(mapStateToProps, mapDispatchToProps)(DealBtnContainer);
