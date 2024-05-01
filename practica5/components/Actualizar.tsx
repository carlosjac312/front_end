import { Signal } from "@preact/signals";
import { FunctionComponent } from "preact";
import { Tarea, Estado } from "../types.ts";

interface Props {
  onClose: () => void;
  oldTask:Tarea;
  tasks: Signal<Tarea[]>;
}

function updateTask( upt:Tarea, props: Props) {
  const errorMSG = document.getElementById("errorMSG");
  if (upt.name==="" || props.tasks.value.find((e)=>e.name===upt.name)) {
    errorMSG.style.display = "block";
  } else {
    const newArr:Tarea[]=props.tasks.value.map((e)=>{
        if(e===props.oldTask) return upt;
        else return e;
    })
    props.tasks.value=newArr;
    props.onClose();
  }
}

export const Actualizar: FunctionComponent<Props>  = (props: Props) => {
  const newTask:Tarea={name:"", state:Estado.TO_DO};
  return (
    <>
      <div
        class="update"
        onClick={() => {
          props.onClose();
        }}
      />
      <div class="updatecont">
          <input class="separa" id="name" placeholder={"Nuevo nombre"} onInput={((e)=>newTask.name=e.currentTarget.value)}></input>
          <select class="separa" onChange={((e)=>newTask.state=e.currentTarget.value as Estado)}>
            <option value={Estado.TO_DO}>{Estado.TO_DO}</option>
            <option value={Estado.In_progress}>{Estado.In_progress}</option>
            <option value={Estado.In_review}>{Estado.In_review}</option>
            <option value={Estado.Done}>{Estado.Done}</option>
          </select>
          <label id="errorMSG" class="errorMSG">Datos incompletos o tarea repetida</label>
          <button class="pabajo" onClick={(()=>updateTask(newTask, props))}>Actualizar</button>
        </div>
      
    </>
    
  );
}