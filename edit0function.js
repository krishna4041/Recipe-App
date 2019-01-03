class RecepiApp{
    constructor(id){
        this.id = id;
        this.name = ""
        this.steps = ""
        this.ingredients = []
    }
}
// localStorage.removeItem('recepies')

const print_ingredient_list = function (id) {
    document.querySelector('#ingredients-list').innerHTML = ""

    recepies.forEach(function (item) {
        if(item.id === id){
            item.ingredients.forEach(function(iter){
                const insert_ingredients = document.createElement('div')
                const checkboxes = document.createElement('input')
                const label_tag = document.createElement('label')
                const recepi_text = document.createElement('spam')
                const remove_ingredient = document.createElement('div')

                insert_ingredients.classList.add('item')
                label_tag.classList.add('check')
                remove_ingredient.classList.add('rm-btn')

                checkboxes.addEventListener('change',function () {
                    toggle_checkbox(iter)
                  //  debugger
                })

                remove_ingredient.addEventListener('click',function() {
                    //debugger
                    toggle_remove_ingredient(iter)
                    print_ingredient_list(location.hash.substring(1))
                })

                checkboxes.setAttribute('type','checkbox')
                checkboxes.checked = iter.is_available
                recepi_text.textContent = iter.name
                remove_ingredient.textContent = 'remove'

                label_tag.append(checkboxes)
                label_tag.append(recepi_text)
                insert_ingredients.append(label_tag)
                insert_ingredients.append(remove_ingredient)
                document.querySelector('#ingredients-list').appendChild(insert_ingredients)
        })
    }

    })  

}


//localStorage.removeItem('recepies')
var recepies = localStorage.getItem('recepies')
if(recepies === null){
    recepies = []
}
else{
    recepies = JSON.parse(recepies)
}
const print_saved_values = function () {
    var id = location.hash.substring(1)
    console.log(recepies);
    recepies.forEach(function (item) {
            // debugger
            if(item.id === id){
                document.querySelector('#recipe-name').value = item.name
                document.querySelector('#recipe-steps').value = item.steps
                print_ingredient_list(item.id)
            }
    })
}
// debugger
print_saved_values()

const check_recepi = function (id) {
    for(var iter = 0;iter<recepies.length;iter++){
        if(recepies[iter].id === id){
            return true
        }
    }
   // return false
}

const add_ingredient = function (id,ingredient) {
    recepies.forEach(function (item) {
        if(item.id === id){
            item.ingredients.push(ingredient)
        }
    })
}


const toggle_checkbox = function(ingredient){
    var id = location.hash.substring(1)
    recepies.forEach(function (item) {
        if(item.id === id){
            item.ingredients.forEach(function(iter){
                if(iter.name === ingredient.name) {
                    iter.is_available = !ingredient.is_available
                }
            })
        }
    })
}

const toggle_remove_ingredient = function(ingredient) {
    var id = location.hash.substring(1)
    var temp = 0 ,pos 
    recepies.forEach(function (item) {
        pos = item.ingredients.indexOf(ingredient)
        if(pos !== -1){
            return
        }
        temp+=1
    })
    recepies[temp].ingredients.splice(pos,1)
}

document.querySelector('#add-ingredient').addEventListener('submit',function(e){
    e.preventDefault()
    // debugger
    var id = location.hash.substring(1)
    if(check_recepi(location.hash.substring(1)) !== true){
        var new_recepi = new RecepiApp(id)
        recepies.push(new_recepi)
    }
    var ingredient = {
        name : e.target.elements.ingredient.value,
        is_available : false
    }
    if(ingredient.name !== ''){
        add_ingredient(id,ingredient)
        print_ingredient_list(id)
    }   
    e.target.elements.ingredient.value = ""
})

document.querySelector('#save').addEventListener('click',function(e){
    //debugger
        var is_item_created = false
        var recepi_name = document.querySelector('#recipe-name').value
        var recepi_steps = document.querySelector('#recipe-steps').value
        var id = location.hash.substring(1)
        recepies.forEach(function(item){
            if(item.id === id){
                item.name = recepi_name
                item.steps = recepi_steps
                is_item_created = true
            }
        })
        if(is_item_created === false){
            var new_recepi = new RecepiApp(location.hash.substring(1))
            new_recepi.name = recepi_name
            new_recepi.steps = recepi_steps
            recepies.push(new_recepi)
        }
    //   debugger
        //localStorage.setItem('recepies',nu)
        localStorage.setItem('recepies',JSON.stringify(recepies))
        //location.assign('index.html')
        window.open(`index.html`,"_self")
})

document.querySelector('#delete').addEventListener('click',function(e) {
    debugger
    var id = location.hash.substring(1)
    var pos = 0
    recepies.forEach(function (item) {
        if(item.id === id){
            return
        }   
        pos+=1
    })
    recepies.splice(pos,1)
    localStorage.setItem('recepies',JSON.stringify(recepies))
    window.open(`index.html`,"_self")
})