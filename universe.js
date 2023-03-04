const loadTools = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayTools(data.data.tools, dataLimit);

}

const displayTools = (tools, dataLimit) => {
    // console.log(tools)
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.innerHTML = '';

 
    // display 6  tool card only
    const showAll = document.getElementById('show-all');
    if (dataLimit && tools.length > 6) {
        tools = tools.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display data
    tools.forEach(tool => {
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
        <div class="card my-3">
        <img src="${tool.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title font-bold">Feature</h5>
          <p class="card-text">1. ${tool.features[0]}</p>
          <p class="card-text">2. ${tool.features[1]}</p>
          <p class="card-text">3. ${tool.features[2]}</p>
        </div>
        <hr>
        <h4>${tool.name}</h4>
        <div class="d-flex justify-content-between px-2">
        <p><i class="fa-regular fa-calendar"></i> ${tool.published_in}</p>

<button onclick="loadArrowDetails('${tool.id}')" class="btn btn-outline-danger border-0" data-bs-toggle="modal" data-bs-target="#arrowModal"><i class="fa-solid fa-arrow-right"></i></button>
      
    
        </div>
      </div>
        `;
        // console.log(tool)
        toolsContainer.appendChild(toolDiv);
    });


        // stop loader / spinner
        toggleSpinner(false);

    }

    // spinner or loader
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

    // Add event listener to Sort by Date button (bonus)
// 
// 
// 
        
        



// shortcut function
const processSearch = (dataLimit) => {
    
    // start loader / spinner
    loadTools(dataLimit);
    toggleSpinner(true);
}

// handle see more/show all button click
document.getElementById('show-all').addEventListener('click', function () {
    processSearch();
    toggleSpinner(true);
    
})

// modal section
const loadArrowDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayArrowDetails(data.data);

}

const displayArrowDetails = data => {
    // console.log(data);
    const modalTitle = document.getElementById('arrowModalLabel');
    modalTitle.innerText = data.tool_name;

    const modalBody = document.getElementById('modal-body');
 
    modalBody.innerHTML=`
    <div class="d-flex p-5">
    <div class="border border-danger rounded  w-75 container">
    <div>
       <h4>${data.description}</h4>
       <div class="d-flex p-1 justify-content-around align-items-center gap-10 text-center my-3 ">

       <div class="text-success">${data.pricing !==null ? data.pricing[0].price : 'Free Of Cost'} <br>  ${data.pricing !==null?data.pricing[0].plan:'Basic'}</div>
       
       <div class="text-warning">${data.pricing !==null ? data.pricing[1].price : 'Free Of Cost'} <br>  ${data.pricing !==null?data.pricing[1].plan:'Pro'}</div>
       
       <div class="text-danger">${data.pricing !==null ? data.pricing[2].price : 'Free Of Cost'} <br>  ${data.pricing !==null?data.pricing[2].plan:'Enterprise'}</div>
  
   </div>
       <div class="d-flex gap-2">
       <div>
             <h2>Features</h2>
               <h6 class="mb-1">${data?.features[1].feature_name ? '&#9679 ' +data.features[1].feature_name : ""}</h6>
               <h6>${data?.features[2].feature_name ? '&#9679 ' + data.features[2].feature_name : ""}</h6>
               <h6>${data?.features[3].feature_name ? '&#9679 ' + data.features[3].feature_name : ""}</h6>
           </div>
           <div>
               <h2>Integrations</h2>
               <h6> &#9679 ${data.integrations === null||data.integrations[0] === undefined ?"No Data found"  :data.integrations[0]}</h6>
               <h6> &#9679 ${data.integrations === null||data.integrations[1] === undefined ?"No Data found"  :data.integrations[1]}</h6>
               <h6> &#9679  ${data.integrations === null||data.integrations[2] === undefined ?"No Data found"  :data.integrations[2]}</h6>
       
           </div>
       </div>
   </div>
   </div>



<div class="w-full text-center">
   <div class="relative">
       <img class=" w-75" src="${data.image_link[0]}" alt="">
       <h2>${data.input_output_examples !== null ? data.input_output_examples[0].input : 'Can you give any example?'}</h2>
       <p>${data.input_output_examples !== null ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
       
<div id="accuracy-div"
   class="px-5 py-5 absolute"
   style="${data.accuracy.score !== null ? '' : 'display: none;'}">
   <p class="btn btn-danger position-absolute top-0 end-0 mt-4 me-4" >${data.accuracy.score*100}% Accuracy</p>

</div>

</div>
</div>
    `;

}

// <h4 class="text-center mt-4">${data.input_output_examples[0].input}</h4>
// <p class="text-center fs-5"> ${data.input_output_examples[0].output}</p>


processSearch(6);