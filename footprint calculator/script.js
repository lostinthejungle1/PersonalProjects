// const ingredient = {
//     name:'Tofu',
//     weight:200,//g i need to convert it here
//     co2e:12.5//kg
//     //kilograms of co2e corresponding to its weight
// }

//kgs of Greenhouse gas emissions per kilogram of food product
const addIngredientBtn = document.querySelector('#addIngredient');
const submitEditBtn = document.querySelector('#submit-edit');
const new_ingredient_name = document.querySelector('#name');
const edit_ingredient_name = document.querySelector('#edit-name');
const edit_ingredient_weight = document.querySelector('#edit-weight');
const new_ingredient_weight = document.querySelector('#weight');
const dish_name = document.querySelector('#dish-name');
const sum_dish_name = document.querySelector('#sum-dishname');
const sum_total_footprint = document.querySelector('#sum-total-footprint');
const list_container = document.querySelector('#list-container');

const delete_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>`;

const edit_svg= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>`


const footprintDB =  {
    'apples': 0.43,
    'bananas': 0.86,
    'barley': 1.18,
    'beef_herd': 99.48,
    'beef_dairy': 33.3,
    'beet_sugar': 1.81,
    'berries_grapes': 1.53,
    'brassicas': 0.51,
    'cane_sugar': 3.2,
    'cassava': 1.32,
    'cheese': 23.88,
    'citrus_fruit': 0.39,
    'coffee': 28.53,
    'dark_chocolate': 46.65,
    'eggs': 4.67,
    'farmed_fish': 13.63,
    'groundnuts': 3.23,
    'lamb_mutton': 39.72,
    'maize': 1.7,
    'milk': 3.15,
    'nuts': 0.43,
    'oatmeal': 2.48,
    'onions_leeks': 0.5,
    'other_fruit': 1.05,
    'other_pulses': 1.79,
    'other_vegetables': 0.53,
    'peas': 0.98,
    'pig_meat': 12.31,
    'potatoes': 0.46,
    'poultry_meat': 9.87,
    'farmed_prawns': 26.87,
    'rice': 4.45,
    'root_vegetables': 0.43,
    'soy_milk': 0.98,
    'tofu': 3.16,
    'tomatoes': 2.09,
    'wheat_rye': 1.57,
    'wine': 1.79
};



const ingredients_added = [];

const addNewIngredient = (e)=>{
    e.preventDefault();
    let name = new_ingredient_name.value;
    let weight = new_ingredient_weight.value;
    console.log(name,weight)
    const newIngredient = {
        name,weight,co2e:null
    }
    updateIngredientFootprint(newIngredient);
    ingredients_added.push(newIngredient);
    console.log('updated list:',ingredients_added);
    renderList(ingredients_added);
}

const updateSum = ()=>{
    console.log('dishname:',dish_name.value)
    console.log('total:',calculateTotalFootprint(ingredients_added)+' kg CO2e')
    sum_dish_name.innerHTML = dish_name.value;
    sum_total_footprint.innerHTML = calculateTotalFootprint(ingredients_added)+' kg CO2e';
}

addIngredientBtn.addEventListener('click',addNewIngredient);

const calculateSingleFootprint = ingredient=>{
    return Number(Number(footprintDB[ingredient.name]*ingredient.weight/1000).toFixed(3));
}

const updateIngredientFootprint = ingredient =>{
    ingredient['co2e'] = calculateSingleFootprint(ingredient);
}

const calculateTotalFootprint = ingredients_added =>{
    let total_footprint = 0;
    ingredients_added.forEach(ingredient=>{
        updateIngredientFootprint(ingredient);
        total_footprint += ingredient.co2e;
    })
    return total_footprint.toFixed(3);
}
const deleteItem = index=>{
    ingredients_added.splice(index,1);
    renderList(ingredients_added);
}

const showEditPrompt = index=>{
    console.log('i can still call this func',index)
    edit_ingredient_name.value = ingredients_added[index].name;
    edit_ingredient_weight.value = ingredients_added[index].weight;
    submitEditBtn.addEventListener('click',()=>{
        // console.log('edited weight:',edit_ingredient_weight.value);
        ingredients_added[index].name = edit_ingredient_name.value;
        ingredients_added[index].weight = edit_ingredient_weight.value;
        updateIngredientFootprint(ingredients_added[index]);
        console.log('updated list after editting:',ingredients_added);
        renderList(ingredients_added);
    })
}
const renderIngredient = (ingredient,index) =>{
    const ingredient_html = `
    <th scope="row">${index+1}</th>
    <td>${ingredient.name}</td>
    <td>${ingredient.weight}</td>
    <td>${ingredient.co2e}</td>
    <td>
        <button type="button" class="btn btn-primary" onclick='deleteItem(${index})'>
            ${delete_svg}
        </button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal"  data-bs-target="#editModal" onclick='showEditPrompt(${index})'>
            ${edit_svg}
        </button>
    </td>`

    const row = document.createElement('tr');
    row.innerHTML = ingredient_html;
  return row;
}

const renderList = ingredients_added =>{
    list_container.innerHTML='';
    console.log(ingredients_added)
    for(let i=0;i<ingredients_added.length;i++){
        list_container.appendChild(renderIngredient(ingredients_added[i],i))
    }
    updateSum();
}