import { FunctionComponent } from "preact";

type DogProps = {
  name: string;
  max_height_male: number;
  max_height_female: number;
  max_weight_male: number;
  max_weight_female: number;
  good_with_children: number;
  good_with_other_dogs: number;
  good_with_strangers: number;
  image_link: string;
};

const Dog: FunctionComponent<DogProps> = (props) => {
  const {
    name,
    max_height_male,
    max_height_female,
    max_weight_male,
    max_weight_female,
    good_with_children,
    good_with_other_dogs,
    good_with_strangers,
    image_link,
  } = props;
  return (
    <div class="perrosDisplay">
      <img src={image_link} class="imageSize" />
      <div>
        <h2>{name}</h2>
        <ul>
          <li>Altura max de machos: {max_height_male}</li>
          <li>Altura max de hembras: {max_height_female}</li>
          <li>Peso max de machos: {max_weight_male}</li>
          <li>Altura max de hembras: {max_weight_female}</li>
          <li>Bueno con extraños: {good_with_strangers}</li>
          <li>Bueno con niño: {good_with_children}</li>
          <li>Bueno con otros perros: {good_with_other_dogs}</li>
        </ul>
        <a href="/dog">Volver al formulario de búsqueda</a>
      </div>
    </div>
  );
};

export default Dog;
