var recipes = localStorage.getItem('recepies')
//  debugger
recipes = JSON.parse(recipes)

const Print_recipe = function (item){
    const div_tag = document.createElement('div')
    const recipe_name = document.createElement('h1')
    const recipe_status = document.createElement('p')

    recipe_status.classList.add('recipe-subtitle')
    recipe_name.classList.add('recipe-title')
    div_tag.classList.add('recipe-item')

    recipe_name.textContent = item.name

    var ingre_lenght = 0
    item.ingredients.forEach(function(iter){
        if(iter.is_available){
            ingre_lenght +=1
        }
    })
    
    if(ingre_lenght === item.ingredients.length && ingre_lenght !== 0 ){
        recipe_status.textContent = "you have all the ingredients"
    }
    else if(ingre_lenght === 0){
        recipe_status.textContent = "you dont have items"
    }
    else{
        recipe_status.textContent = "you have some recipes"
    }

    div_tag.addEventListener('click', function () {
        window.open(`/edit.html#${item.id}`,"_self")
    })

    div_tag.appendChild(recipe_name)
    div_tag.appendChild(recipe_status)
    document.querySelector('#recipes-collection').appendChild(div_tag)
}

const Search_And_Print_recipe = function (is_search,search_value){
    var search_count = 0
    document.querySelector('#recipes-collection').innerHTML = ""
    recipes.forEach(function(item){

        if(is_search){
            if(item.name.toLowerCase().includes(search_value.toLowerCase())===true){
            //    document.querySelector('#recipes-collection').innerHTML = ""
                Print_recipe(item)
            }
            else{
                search_count+=1
            }
        }
        else{
            Print_recipe(item)
        }
    })
    if(search_count === recipes.length){
        const No_recipe_found = document.createElement('h1')
        No_recipe_found.textContent = "No Recipes found"
      //  document.querySelector('#recipes-collection').innerHTML = ""
        document.querySelector('#recipes-collection').appendChild(No_recipe_found)
    }
}

document.querySelector("#search-bar").addEventListener('input',function (e){
    //debugger
    var search_value = e.target.value
    console.log(search_value)
    //debugger
    if(search_value === ""){
        document.querySelector('#recipes-collection').innerHTML = ""
        Search_And_Print_recipe(false,null)        
    }
    else{
        Search_And_Print_recipe(true,search_value)
    }
})
Search_And_Print_recipe(false,null)
