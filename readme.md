
## Movies

#### Functionality

1. Global search -
2. Multi search
3. Add to wishlist / delete from wishlist
4. Loader +
5. Dark / Light mode
6. UI / Responsive mode +

### Tools / Languages / Library
- Tailwind-css
- JavaScript core
- HTML5



### Colors : https://colorhunt.co/palette/fa7070fefdedc6ebc5a1c398

---
---
## Explanation For Codes And Functions:
---
### Selector for one element:
```javascript
function $(s) {
    return document.querySelector(s);
}
ex:
const globalSearch = $('#global-search')
```
---
### Selector for more than one element:
```javascript
function $$(s) {
    return document.querySelectorAll(s);
}
```
---
### Creating a new element function
```javascript
function createElement(tagName, classList, content) {
    const el = document.createElement(tagName);
    if(classList) {
        el.setAttribute('class', classList);
    }
    if(content) {
        el.innerHTML = content;
    }
    return el;
}
```
---

### Normalizing objects which comes from backend side.

##### Abnormal abject
```javascript
var movies = [

    {
        "title": "Patton Oswalt: Annihilation",
        "year": 2017,
        "categories": [
            "Uncategorized"
        ],
        "imdbId": "tt7026230",
        "imdbRating": 7.4,
        "runtime": 66,
        "language": "English",
        "youtubeId": "4hZi5QaMBFc",
        "summary": "Patton Oswald, despite a personal tragedy, produces his best standup yet. Focusing on the tribulations of the Trump era and life after the loss of a loved one, Patton Oswald continues his journey to contribute joy to the world.",
        "smallThumbnail": "http://i3.ytimg.com/vi/4hZi5QaMBFc/hqdefault.jpg",
        "bigThumbnail": "http://i3.ytimg.com/vi/4hZi5QaMBFc/maxresdefault.jpg"
    },

    {
        "title": "New York Doll",
        "year": 2005,
        "categories": [
            "Documentary",
            "Music"
        ],
        "imdbId": "tt0436629",
        "imdbRating": 7.9,
        "runtime": 75,
        "language": "English",
        "youtubeId": "jwD04NsnLLg",
        "summary": "A recovering alcoholic and recently converted Mormon, Arthur \"Killer\" Kane, of the rock band The New York Dolls, is given a chance at reuniting with his band after 30 years.",
        "smallThumbnail": "http://i3.ytimg.com/vi/jwD04NsnLLg/hqdefault.jpg",
        "bigThumbnail": "http://i3.ytimg.com/vi/jwD04NsnLLg/maxresdefault.jpg"
    },
    ...
    ]
```
##### Function for normalizing the data:

```javascript
let normalizedData = someData.map((movie) => {
    return {
        title: movie.title,
        year: movie.year,
        genre: movie.categories,
        id: movie.imdbId,
        rating: movie.imdbRating,
        runtime: `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
        language: movie.language,
        youTube: `https://youtube.com/embed/${movie.youtubeId}`,
        summary: movie.summary,
        smallImg: movie.smallThumbnail,
        bigImg: movie.bigThumbnail,
    }
})
```
### Reusable Function For Rendering Data on browser
```javascript
function renderData(data) {
    cardsGrid.innerHTML = `
        <div class="loader-wrapper">
            <div class="loader"></div> 
        </div>
`;
    setTimeout(()=>{
        if(data.length){

            cardsGrid.innerHTML = ''

            data?.forEach((el) => {

                const card = createElement('div', 'card', `

                <div class="card-img">
                        <img src="${el.bigImg}" alt="img">
                    </div>
                    
                    <div class="card-body">
                        <h2>${el.title.substring(0, 20)}...</h2>
                        <ul>
                            <li><strong>Year: </strong><span>${el.year}</span></li>
                            <li><strong>Rating: </strong><span>${el.rating}</span></li>
                            <li><strong>Language: </strong><span>${el.language}</span></li>
                            <li><strong>Genre: </strong><span class="text-[12px]">${el.genre}</span></li>
                            <li><strong>Time: </strong><span>${el.runtime}</span></li>
                        </ul>
                        <div class="buttons">
                            <button>Read more</button>
                            <button class="like-btn"><img src="assets/icons/heart.svg" alt="heart"></button>
                        </div>
                    </div>
            `)
                cardsGrid.appendChild(card)

            })
        } else{
            cardsGrid.innerHTML = `<h1 class="text-red">ERROR 404 DATA NOT FOUND!!!</h1>`
        }
    }, 10)

}

// Usage 

// Rendering data
renderData(normalizedData)
```

### Global Search => Input

```javascript
globalSearch.addEventListener('keyup', (e) =>  {
    console.log( e.target.value.toLowerCase())
    let filteredData = normalizedData.filter((el) => (el.title.toLowerCase().includes(e.target.value)))
    renderData(filteredData)
})
```
### Filter options (genre)
```javascript
function filteredOptions (state) {
    const options = [];
    state?.forEach((el) => {
        el.genre.forEach((g) => {
           if(!options.includes(g)) {
               options.push(g)
           }
        })
    }) 
    
    options.sort()
    return options;
}
```

### Render options on browser
```javascript
function renderOptions(state) {
    
    state.forEach((el) => {
        const option = createElement('option', 'option-item', el)
        console.log(option)
        genresSelect.appendChild(option)
    })
}
renderOptions(filteredOptions(normalizedData))

```
### Multi searching 
```javascript
function multiSearch(state){
    // Filter by title
    let filteredData = state.filter((el) => {
        return el.title.toLowerCase().includes($('#film-name').value.toLowerCase()) &&
                el.rating <= $('#film-rating').value  &&
                el.genre.includes($('#genres').value)
    })
    renderData(filteredData)
}
```
### Form submit
```javascript
form.addEventListener('submit', (e)=>{
    console.log('submit')
    multiSearch(normalizedData)
})
```



















