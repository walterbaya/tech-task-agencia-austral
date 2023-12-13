import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
  IonLabel,
  IonCardContent,
} from '@ionic/react';
import CardUtil from '../util/CardUtil';
import "./Card.css";

const Card: React.FC<CardUtil> = (card) => {

  return (
    <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle color="primary">{(card.name).toUpperCase()}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItem>
              <div className="pokemon-info"><IonLabel>Weight:</IonLabel><span className='ion-margin-start'>{card.weight}</span></div>
            </IonItem>
            <IonItem>
              <div className="pokemon-info"><IonLabel>Height:</IonLabel><span className='ion-margin-start'>{card.height}</span></div>
            </IonItem>
            <IonItem>
              <div className="pokemon-info"><IonLabel>Experience:</IonLabel><span className='ion-margin-start'>{card.base_experience}</span></div>
            </IonItem>
          </IonList>
          <IonList className="overflow-scroll">
            <IonItem color="primary">ABILITIES</IonItem>
            {card.pokemon_v2_pokemonabilities.map(function (abilitie, index) {
              return (<IonItem key={index} color="light">{abilitie.pokemon_v2_ability.name}</IonItem>)
            })}
          </IonList>
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default Card;
