import { Signal } from "@preact/signals";
import { FunctionComponent } from "preact";
import { Tarea, Estado } from "../types.ts";

interface Props {
  onClose: () => void;
  tasks: Signal<Tarea[]>;
}

function postTask(t:Tarea, props: Props) {
  const errorMSG = document.getElementById("errorMSG");
  if (t.name==="" || props.tasks.value.find((e)=>e.name===t.name)) {
    errorMSG.style.display = "block";
  } else {
    props.tasks.value.push(t);
    props.onClose();
  }
}

export const Crear: FunctionComponent<Props>  = (props: Props) => {
  const newTask:Tarea={name:"", state:Estado.TO_DO};
  return (
    <>
      <div
        class="popUp"
        onClick={() => {
          props.onClose();
        }}
      />
      <div class="createcont">
          <input class="separa" id="name" placeholder={"Nombre de la tarea"} onInput={((e)=>newTask.name=e.currentTarget.value)}></input>
          <select class="separa" onChange={((e)=>newTask.state=e.currentTarget.value as Estado)}>
            <option value={Estado.TO_DO}>{Estado.TO_DO}</option>
            <option value={Estado.In_progress}>{Estado.In_progress}</option>
            <option value={Estado.In_review}>{Estado.In_review}</option>
            <option value={Estado.Done}>{Estado.Done}</option>
          </select>
          <label id="errorMSG" class="errorMSG">Datos incompletos o tarea ya existente</label>
          <button class="separa" onClick={(()=>postTask(newTask, props))}>Crear</button>
        </div>
      
    </>
    
  );
}
