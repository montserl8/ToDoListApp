import pkg from "pg"
const {Pool}=pkg

const pool= new Pool ({
    user:"postgres",
    host: "localhost",
    database: "postgres",
    password: "Brumh1!",
    port: 5432
})

export async function POST ({request}){
    let frontdata = await request.json()
    console.log(frontdata)
    let client= await pool.connect()
    let completequery= `update tareas set completado=$1 WHERE id=$2`
    let values=[frontdata.completado, frontdata.pato] 
    let result=await client.query(completequery, values)

    client.release()
    return new Response ("OK", {status:200})
}