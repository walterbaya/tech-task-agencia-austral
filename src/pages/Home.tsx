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
  var [page, setPage] = useState(0);
  var [start, setStart] = useState(true);
  var [maxPage, setMaxPage] = useState(2);
  var [pokemones, setPokemones] = useState(Array<CardUtil>());

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

  async function fetchStartPokemons() {
    const result = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      body: JSON.stringify({
        query: `query getItems{pokemon_v2_pokemon(limit: 12){id, height, base_experience, name, pokemon_v2_pokemonabilities {pokemon_v2_ability {name}}, weight}
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
    initialSlide: 1
  };

  const ionSlideNextStart = () => {
    if (start) {
      fetchStartPokemons().then(response => setPokemones(response.data.pokemon_v2_pokemon)).then()
      setStart(false)
    }

    if (page + 1 > maxPage) {
      setMaxPage(page + 1);
      fetchPokemons(page + 1).then(response => setPokemones([...pokemones, ...response.data.pokemon_v2_pokemon]))
      console.log("adentro")
    }
    setPage(page + 1);
    console.log(page + 1)
    
  };

  const ionSlidePrevStart = async () => {
    if (!slidesRef.current) return;
    setPage(page - 1);
    console.log(page - 1)
  };

  function renderPokemones(i: number) {
    console.log(pokemones)
    if (pokemones.length > 0) {
      return (<CardContainer cards={pokemones.slice(4 * i, 4 * (i + 1))}></CardContainer>);
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

          <IonSlide>{ renderPokemones(0)}</IonSlide>
          <IonSlide>{ renderPokemones(1)}</IonSlide>
          <IonSlide>{ renderPokemones(2)}</IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Home;


