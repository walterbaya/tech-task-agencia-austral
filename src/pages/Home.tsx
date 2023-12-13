import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
} from "@ionic/react";
import { useRef, useState, useEffect } from "react";
import "./Home.css";
import CardContainer from "../components/CardContainer";

const Home: React.FC = () => {
  const slidesRef = useRef<HTMLIonSlidesElement>(null);
  const [pokemones, setPokemones] = useState({});

  useEffect(() => {
    fetchPokemons().then(response => console.log(response))
    //setPokemones();
    console.log(pokemones)
  }, [])

  async function fetchPokemons() {
    const result = await fetch("https://beta.pokeapi.co/graphql/v1beta?limit=4&offset=4", {
      method: "POST",
      body: JSON.stringify({
        query: `query getItems{pokemon_v2_pokemon(limit: 4, offset: 4) 
          {height, base_experience, name, pokemon_v2_pokemonabilities {pokemon_v2_ability {name}}, weight}
        }
          `

        , variables: null,
        operationName: "getItems",
      }),
    });

    return await result.json();
  }

  const options = {
    keyboard: true,
  };

  const slideWillChange = () => {
    console.log("Slide will change");
  };

  const slideDidChange = async () => {
    console.log("Slide did change");

    if (!slidesRef.current) return;

    console.table({
      isBeginning: await slidesRef.current.isBeginning(),
      isEnd: await slidesRef.current.isEnd(),
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSlides
          pager={true}
          scrollbar={true}
          options={options}
          onIonSlideWillChange={() => slideWillChange()}
          onIonSlideDidChange={() => slideDidChange()}
          ref={slidesRef}
        >
          <IonSlide>
            <CardContainer></CardContainer>
          </IonSlide>
          <IonSlide>
            <CardContainer></CardContainer>
          </IonSlide>

        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Home;


