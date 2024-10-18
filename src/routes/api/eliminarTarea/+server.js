import pkg from "pg"
const {Pool}=pkg

const pool= new Pool ({
    user:"postgres",
    host: "localhost",
    database: "postgres",
    password: "Brumh1!",
    port: 5432
})

export async function DELETE ({request}){
    let frontdata = await request.json()
    let client= await pool.connect()
    let deletequery= `DELETE FROM tareas WHERE id=$1`
    let values=[frontdata.id] 
    let result=await client.query(deletequery, values)

    client.release()
    return new Response ("OK", {status:200})
}