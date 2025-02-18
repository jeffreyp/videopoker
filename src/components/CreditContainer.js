import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountUp from "react-countup";

class CreditContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentAmount: props.credits
         };
    }

    updateCurrentAmount(amount) {
        this.setState({
            currentAmount: amount
        });
    }

    getAnimationDuration() {
        if (this.state.currentAmount < this.props.credits) {
            let delta = this.props.credits - this.state.currentAmount;
            if (delta <= 20) {
                return 0.65;
            }
            if (delta <= 250) {
                return 1.2;
            }
            return 5; // full house
        } else {
            return 0.000001;
        }
    }

    render() {
        return (
            <CountUp
                start={this.state.currentAmount || 0}
                end={this.props.credits}
                duration={this.getAnimationDuration()}
                delay={0}
                useEasing={false}
                onEnd={() => this.updateCurrentAmount(this.props.credits)}
                prefix="CREDIT "
            >
                {({ countUpRef }) => (
                    <div className="creditContainer">
                        <span ref={countUpRef} />
                    </div>
                )}
            </CountUp>
        );
    }
}

const mapDispatchToProps = { };

const mapStateToProps = (state) => ({
    credits: state.credit.amount
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditContainer);
