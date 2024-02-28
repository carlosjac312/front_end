import { FunctionComponent } from "preact";

type CityProps = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population: number;
  is_capital: boolean;
};

const City: FunctionComponent<CityProps> = (props) => {
  const { name, latitude, longitude, country, population, is_capital } = props;
  return (
    <div class="userDisplay">
      <h2>{name}</h2>
      <p>Latitud: {latitude}</p>
      <p>Longitud: {longitude}</p>
      <p>Pais: {country}</p>
      <p>Poblacion: {population}</p>
      <p>Es capital: {is_capital ? "Yes" : "No"}</p>
      <a href="/city">Volver al formulario de búsqueda</a>
    </div>
  );
};

export default City;
