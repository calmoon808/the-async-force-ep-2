let category = 'person';
let index;
const container = document.querySelector('#contentContainer');
container.appendChild(document.createElement('h2'));
container.appendChild(document.createElement('p'));
container.appendChild(document.createElement('p'));
container.appendChild(document.createElement('ul'));
document.querySelector('#resourceType').addEventListener('change', function(){
    category = document.querySelector('#resourceType').value;
})
document.querySelector('#resourceId').addEventListener('change', function(){
    index = this.value;
})
document.querySelector('#requestResourceButton').addEventListener('click', function(){
    // console.log(category);
    for (let i in container.children){
        container.children[i].innerHTML = '';
    }
    if (category === 'person'){   
        const person = new XMLHttpRequest();
        person.open('GET', 'https://swapi.co/api/people/' + index + '/');
        person.send();
        person.addEventListener('load', function(){
            if (this.status === 404){
                container.children[1].innerHTML = 'suck it';
            } else {
                const jsonResponse = JSON.parse(this.responseText);
                container.children[0].innerHTML = jsonResponse.name;
                container.children[1].innerHTML = jsonResponse.gender;
                const species = new XMLHttpRequest();
                species.open('GET', jsonResponse.species[0]);
                species.send();
                species.addEventListener('load', function(){
                    const jsonResponse = JSON.parse(this.responseText);
                    container.children[2].innerHTML = jsonResponse.name;
                })
            }
        })
    } else if (category === 'planets'){
        const planet = new XMLHttpRequest();
        planet.open('GET', 'https://swapi.co/api/planets/' + index + '/');
        planet.send();
        planet.addEventListener('load', function(){
            if (this.status === 404){
                container.children[1].innerHTML = 'suck it';
            } else {
                const jsonResponse = JSON.parse(this.responseText);
                container.children[0].innerHTML = jsonResponse.name;
                container.children[1].innerHTML = jsonResponse.terrain;
                container.children[2].innerHTML = jsonResponse.population;
                for (let i in jsonResponse.films){
                    const films = new XMLHttpRequest();
                    films.open('GET', jsonResponse.films[i]);
                    films.send();
                    films.addEventListener('load', function(){
                        const jsonResponse = JSON.parse(this.responseText);
                        let newLi = document.createElement('li');
                        newLi.innerHTML = jsonResponse.title;
                        container.lastChild.appendChild(newLi);
                    })
                }
            }
        })
    } else {
        const starship = new XMLHttpRequest();
        starship.open('GET', 'https://swapi.co/api/starships/' + index + '/');
        starship.send();
        starship.addEventListener('load', function(){
            if (this.status === 404){
                container.children[1].innerHTML = 'suck it';
            } else {
                const jsonResponse = JSON.parse(this.responseText);
                container.children[0].innerHTML = jsonResponse.name;
                container.children[1].innerHTML = jsonResponse.manufacturer;
                container.children[2].innerHTML = jsonResponse.starship_class;
                for (let i in jsonResponse.films){
                    const films = new XMLHttpRequest();
                    films.open('GET', jsonResponse.films[i]);
                    films.send();
                    films.addEventListener('load', function(){
                        const jsonResponse = JSON.parse(this.responseText);
                        let newLi = document.createElement('li');
                        newLi.innerHTML = jsonResponse.title;
                        container.lastChild.appendChild(newLi);
                    })
                }
            }
        })
    }
})