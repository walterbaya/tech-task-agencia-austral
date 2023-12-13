import {
    IonGrid, IonRow, IonCol
} from '@ionic/react';

import Card from './Card';
import CardUtil from '../util/CardUtil';
import React from "react";
import "./CardContainer.css";



type CardContainerProps = {
    cards: Array<CardUtil>
}

const CardContainer: React.FC<CardContainerProps> = (props) => {
    return (
        <IonGrid>
            <IonRow>
                {
                props.cards.map(function (card) {
                    return(<IonCol size="6" key={card.id}>
                        <Card {...card}></Card>
                    </IonCol>);
                })}
            </IonRow>
        </IonGrid>
    );
};

export default CardContainer;
