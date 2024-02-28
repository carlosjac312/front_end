import { FunctionComponent } from "preact";

type UserProps = {
  username: string;
  sex: string;
  address: string;
  email: string;
};

const User: FunctionComponent<UserProps> = (props) => {
  const { username, sex, address, email } = props;
  return (
    <div class="userDisplay">
      <br>
        <image src={"/perfil.png"} class="preetyImage" />
        <h1 class="palCentro">{username}</h1>
      </br>
        <hr></hr>
        <p>{email}</p>
        <p>{sex === "M" ? "Masculino" : "Femenino"}</p>
        <p>{address}</p>
        <a href="/">Volver al indice</a>
    </div>
  );
};

export default User;
