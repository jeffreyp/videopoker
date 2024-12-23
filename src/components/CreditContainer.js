import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountUp from "react-countup";

class CreditContainer extends Component {
    getAnimationDuration(start, end) {
        const delta = Math.abs(end - start);
        if (delta <= 20) return 0.65;
        if (delta <= 250) return 1.2;
        return 5;
    }

    render() {
        return (
            <CountUp
                start={this.props.previousCredits || 0}
                end={this.props.credits}
                duration={this.getAnimationDuration(this.props.previousCredits || 0, this.props.credits)}
                delay={0}
                useEasing={true}
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

const mapStateToProps = (state) => ({
    credits: state.credit.amount,
    previousCredits: state.credit.previousAmount // You'll need to track previous amount in Redux
});

export default connect(mapStateToProps)(CreditContainer);
