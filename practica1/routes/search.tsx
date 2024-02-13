const Page = () => {
  return (
    <div>
      <h1>Busqueda de Personaje</h1>
        <form method={"get"} action={"/people"}>
          <input name={"name"}></input>
          <button type="submit">Search</button>
        </form>
    </div>
  );
};

export default Page;
