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
import CardUtil from "../util/CardUtil";


const Home: React.FC = () => {
  var slidesRef = useRef<HTMLIonSlidesElement>(null);
  var [page, setPage] = useState(1);
  var [pokemones, setPokemones] = useState(Array<CardUtil>());

  useEffect(() => {
    fetchPokemons(page).then(response => setPokemones(response.data.pokemon_v2_pokemon))
  }, [])

  async function fetchPokemons(i: number) {
    const result = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      body: JSON.stringify({
        query: `query getItems{pokemon_v2_pokemon(limit: 4, offset:` + i * 4 +
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
    fetchPokemons(page + 1).then(response => {
      setPokemones(response.data.pokemon_v2_pokemon);
      console.log(response.data.pokemon_v2_pokemon);
    })
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

  function renderPokemones() {
    if (pokemones.length > 0) {
      return (<CardContainer cards={pokemones}></CardContainer>);
    }
    else {
      return (<div>Hello</div>);
    }
  }



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
            {
              renderPokemones()
            }
          </IonSlide>
          <IonSlide>

          </IonSlide>
          <IonSlide>

          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Home;


