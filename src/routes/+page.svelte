<script>
    import { onMount } from 'svelte'


    let tarea = ""
    let lista_de_tareas = [
       
    ]
    onMount (() => {
        obtenerDatos()
    })

    async function eliminarTarea(id){
        let response = await fetch ('/api/eliminarTarea',{
         method:"DELETE",
         headers: {"Content-Type":"application/json"
        },
        body: JSON.stringify(
            {id:id}
        )
        }
        )
        obtenerDatos()
    }

    async function agregarTarea(){
        if (tarea.length === 0) {
            alert("Pusiste una tarea vacia")
        } else {
            let response= await fetch("/api/agregarTarea", {
             method:"POST",
             headers:{
                "Content-Type":"application/json"
             },
             body: JSON.stringify(
                {nombre_tarea: tarea, completado: false}
             )

            })
            lista_de_tareas = [...lista_de_tareas,
            {nombre_tarea: tarea, completado:false}]
            tarea=""
        }
    }
    let isChecked = false

    async function obtenerDatos(){
        let response = await fetch ('/api/obtenerDatos')
        let datos = await response.json()

        
        lista_de_tareas = datos
    }

    async function completarTarea(tarea) {
        let response = await fetch ('/api/completarTarea',{
         method:"POST",
         headers: {"Content-Type":"application/json"
        },
        body: JSON.stringify(
            {pato:tarea.id, completado:tarea.completado}
        )
        }
        )
        obtenerDatos()
        
    }
</script>

<main>

<h1>
    Lista de tareas
</h1>
<input type="text" placeholder="Escribe una tarea aqui" bind:value={tarea}>
<button on:click={agregarTarea}>Agregar</button>
<ul>
    {#each lista_de_tareas as tarea}
    <li>
        <input type="checkbox" bind:checked={tarea.completado}
        on:change={ ()=> completarTarea(tarea)}>

        <span class:completado={tarea.completado}> {tarea.nombre_tarea} </span>

        <button class="container" on:click={ ()=> eliminarTarea(tarea.id)}> 
            Eliminar
        </button>
    </li>



    {/each}
</ul>
</main>

<style>
    main {
        max-width: 400px;
        margin: 0 auto;
        text-align: center;

    }

    input[type="text"] {
        width: calc()100% - 100px;
        padding: 0.5rem;
        margin-right: 0.5rem;
    }

    button {
        padding: 0.5rem;
        background-color: #6200ea;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 10px;
    }

    ul{
        list-style-type: none;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 0.5rem;
    }

    .completado {
        text-decoration: line-through;
        color: #888;
    }

    
    button:hover {        
        background-color:#3700b3;
        color: rgb(34, 33, 32);
    }

    .container{        
        background-color:#ceb02a7d;
        color: rgb(34, 33, 32);
    }

    input [type="checkbox"] {
        margin-right: 10px;
    }

</style>

