const loadTools = async() => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(URL);
    const data = await res.json();

    displayTools(data)
}

const displayTools = tools => {
    console.log(tools)
}
loadTools();
