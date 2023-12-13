import {
    IonGrid, IonRow, IonCol
} from '@ionic/react';

import Card from './Card';
import React from "react";

type Card = {
    id: string
}
type CardContainerProps = {
    cards: Array<Card>
}

const CardContainer: React.FC<CardContainerProps> = (props) => {
    return (
        <IonGrid>
            <IonRow>
                {props.cards.map(card => {
                    return (

                        <IonCol key={card.id}>
                            <Card card={card}></Card>
                        </IonCol>
                    );
                })}
            </IonRow>
        </IonGrid>
    );
};

export default CardContainer;
