export default async function rol(email) {
    const resp2 = await fetch("http://localhost:3000/getRol", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    const resp3 = await resp2.json();
    if (resp3.length <= 0) {
        return "persona"
    }
    return resp3[0].rol

}