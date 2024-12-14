import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./Card";
import CardHold from "./CardHold";
import { holdCard } from "../actions/index";

class CardContainer extends Component {
    handleCardClick = (id) => {
        if (!this.props.roundEnded) this.props.holdCard(id);
    }

    render() {
        let cards = this.props.hand;
        return (
            <div className="cardContainer padded">
                {Object.keys(cards).map((key) => {
                    return (
                        <figure key={key}
                                onClick={() => this.handleCardClick(key)}>
                            <CardHold hold={this.props.hold[key]} />
                            <Card id={key}
                                  card={cards[key]}
                                  revealed={this.props.cardRevealed[key]}
                                  
                            />
                        </figure>   
                    );
                })}
            </div>
        );
    }
}

const mapDispatchToProps = { holdCard };

const mapStateToProps = (state) => ({
    hand: state.game.hand,
    hold: state.game.hold,
    roundEnded: state.game.roundEnded,
    cardRevealed: state.ui.cardRevealed
});

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);

