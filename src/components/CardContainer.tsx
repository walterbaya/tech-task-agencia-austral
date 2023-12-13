import {
    IonGrid, IonRow, IonCol
} from '@ionic/react';

import React from "react";

const CardContainer: React.FC = () => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol></IonCol>
                <IonCol></IonCol>
                <IonCol></IonCol>
                <IonCol></IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default CardContainer;
