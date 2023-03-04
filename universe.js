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
        showAll.classList.remove('hidden');
    }
    else {
        showAll.classList.add('hidden');
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
        loaderSection.classList.remove('hidden');
    }
    else {
        loaderSection.classList.add('hidden');
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

// handle see more button click
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
    toggleSpinner(true);
})


//todo see more function delete after execute function
// const showAllBtn = isClicked => {
//     const seeMoreSection = document.getElementById('show-all');
//     if(isClicked) {
//         seeMoreSection.classList.remove('hidden');
//     }
//     else{
//         seeMoreSection.classList.add('hidden')
//     }
// }






// modal section
const loadArrowDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayArrowDetails(data.data);

}

const displayArrowDetails = data => {
    console.log(data);
    const modalTitle = document.getElementById('arrowModalLabel');
    modalTitle.innerText = data.tool_name;

    const modalBody = document.getElementById('modal-body');
 
    modalBody.innerHTML=`
    <div class="d-flex  p-4 gap-4">
    <div class="border border-danger rounded p-4">
        <div>
        <h4>${data.description}</h4>
        </div>
    <div class="d-flex justify-content-around mt-4">

    <div>
    <h6 class="fw-bold text-success">${data.pricing[0].price}<h6>
    <h6 class="fw-bold text-success text-center">${data.pricing[0].plan}</h6>
    </div>

    <div>
    <h6 class="fw-bold text-warning">${data.pricing[1].price}<h6>
    <h6 class="fw-bold text-warning text-center">${data.pricing[1].plan}</h6>
    </div>

    <div>
    <h6 class="fw-bold text-danger">${data.pricing[2].price}<h6>
    <h6 class="fw-bold text-danger text-center">${data.pricing[2].plan}<h6>
    </div>

    </div>

    <div class="d-flex mt-4">
    <div>
    <h3>Feature</h3>
    <ul>
    <li>${data.features[1].feature_name}</li>
    <li>${data.features[2].feature_name}</li>
    <li>${data.features[3].feature_name}</li>
    </ul>  
    
    </div>
    <div class="ms-4">
    <h3>Integration</h3>
    <ul>
    <li>${data.integrations[0]}</li>
    <li>${data.integrations[1]}</li>
    <li>${data.integrations[2]}</li>
    </ul>
    </div>
</div>
</div>
<div>

<img width="100%" class="position-relative" src="${data.image_link[0]}" alt="">

<p class="btn btn-danger position-absolute top-0 end-0 mt-4 me-4" >${data.accuracy.score*100}% Accuracy</p>
        
<h4 class="text-center mt-4">${data.input_output_examples[0].input}</h4>

<p class="text-center fs-5"> ${data.input_output_examples[0].output}</p>

</div>

    </div> 
</div>
    `;

}


processSearch(6);