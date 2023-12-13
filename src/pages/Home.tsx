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
  var slidesRef = useRef<HTMLIonSlidesElement>(null);
  var [page, setPage]= useState(1);
  var [pokemones, setPokemones] = useState({});

  useEffect(() => {
    fetchPokemons(page).then(response => console.log(response))
    //setPokemones();
    console.log(pokemones)
  }, [])

  async function fetchPokemons(i: number) {
    const result = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      body: JSON.stringify({
        query: `query getItems{pokemon_v2_pokemon(limit: 8, offset:`  + i*8 + 
        `){id, height, base_experience, name, pokemon_v2_pokemonabilities {pokemon_v2_ability {name}}, weight}
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

  const ionSlideNextStart = () => {
    fetchPokemons(page + 1).then(response => console.log(response))
    //setPokemones();
    console.log(pokemones)
    console.log("NEXT");
    setPage(page + 1);
  };

  const ionSlidePrevStart = async () => {
    console.log("PREV");

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
          onIonSlidePrevStart={() => ionSlidePrevStart()}
          onIonSlideNextStart={() => ionSlideNextStart()}
          ref={slidesRef}
        >
          <IonSlide>
            <CardContainer></CardContainer>
          </IonSlide>
          <IonSlide>
            <CardContainer></CardContainer>
          </IonSlide>
          <IonSlide>
            <CardContainer></CardContainer>
          </IonSlide>
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


