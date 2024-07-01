// ------------------------ SELECTORS ------------------------
const themeSwitcher =  $('#theme')
const header = $('#header')
const sidebar = $('#sidebar')
const content = $('#content')
const cards = $('#cards')
const main = $('main')
const selectLang  = $('#lang')
const globalSearch = $('#global-search')
const labelTitle = $('#label-title')
const filmName = $('#film-name')
const labelRating = $('#label-rating')
const labelGenre = $('#label-genre')
const optionText = $('#option-text')
const multiSearchBtn = $('#multi-search-btn')
const genres = $('#genres')
const form = $('#form')
// CUT 100 MOVIES FROM ORIGINAL DB
const hundredMovies = movies.slice(0, 100)

// NORMALIZED DATA
const normalizedData = hundredMovies.map(movie => {
    return {
        title: movie.title,
        year: movie.year,
        genres: movie.categories,
        id: movie.imdbId,
        rate: movie.imdbRating,
        duration: `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
        language: movie.language,
        youtube: `youtube.com/embed/${movie.youtubeId}`,
        summary: movie.summary,
        smallImg: movie.smallImg,
        bigImg: movie.bigThumbnail,
    }
})
// ------------------------ THEME ------------------------
themeSwitcher.addEventListener('change', (e)=>{
    header.classList.toggle('dark')
    sidebar.classList.toggle('dark')
    main.classList.toggle('dark-0')
})

// ------------------------ LANGUAGE SELECTION ------------------------
selectLang.addEventListener('change', (e)=>{
    globalSearch.placeholder = lang[e.target.value].globalSearchPlaceholder
    labelTitle.textContent = lang[e.target.value].multiSearchLabelTitle
    filmName.placeholder = lang[e.target.value].multiSearchInputPlaceholderTitle
    labelRating.textContent = lang[e.target.value].multiSearchLabelRate
    labelGenre.textContent = lang[e.target.value].multiSearchLabelGenre
    optionText.textContent = lang[e.target.value].multiSearchInputPlaceholderGenre
    multiSearchBtn.textContent = lang[e.target.value].multiSearchBtn
})

// Rendering function 
function renderData(data) {
    cards.innerHTML = '<div class="loader-wrapper"><div class="loader"></div></div>'
    setTimeout(()=> {
        cards.innerHTML = ''
        if (data.length) {
            cards.innerHTML = ''
            data.forEach((el) => {
                const newContent = `
                    <img src="${el.bigImg}" alt="img">
                    <div class="card-body">
                        <h3>${el.title.substring(0, 20)}...</h3>
                        <strong>Rate:</strong><span>${el.rate}</span> <br>
                        <strong>Year:</strong><span>${el.year}</span> <br>
                        <strong>Language:</strong><span>${el.language}</span> <br>
                        <strong>Genres:</strong><span title="${el.genres}" id="hover" class="animate-bounce text-[#424874]">Hover me</span> <br>
                        <strong>Duration:</strong><span>${el.duration}</span>
                        <div class="card-buttons">

                            <label id="like-label" for="like-film">
                                <input id="like-film" type="checkbox">
                            </label>

                            <button title="${el.summary}" class="read-more-btn hover:text-[#597445]">Read more...</button>
                        </div>
                    </div>
                    
                </div>
`
                const newEl = createElement('div', 'card', newContent);
                cards.appendChild(newEl);
            })
        }else {
            cards.innerHTML = '<h1>DATA NOT FOUND</h1>'
        }

    },1000)
}

renderData(normalizedData)

// Global Searching 
globalSearch.addEventListener('keyup', (e) => {
    if(normalizedData.length) {
        const filteredData = normalizedData.filter((el) => (el.title.toLowerCase().includes(e.target.value)))
        renderData(filteredData)
    } 
})

// Filter and render genre options
let options = []
function filterOptions (state) {
    state.forEach((el) => {
        el.genres.forEach((g) => {
            if(!options.includes(g)){
                options.push(g)
                let option  = createElement('option', 'option', `${g}`)
                genres.append(option)
            }
        })
    })
    return options
}
const filteredOptions = filterOptions(normalizedData)

// Filter years
let yearOptions = [];
function filterYears(state) {
    state.forEach((el) => {
        if(!yearOptions.includes(el.year)){
            yearOptions.push(el.year)
        }
    })
    yearOptions.sort((a,b)=> a-b)
    return yearOptions
}


// Render years
function renderYears(state) {
    const yearOptions = filterYears(state)
        state.forEach((el) => {
            const yearOption = createElement('option', 'option-item', `${el}`)
            $('#years').appendChild(yearOption)
        })
}
renderYears(filterYears(normalizedData))

filterYears(normalizedData)
// Multi-searching
function multiSearch(state) {
    const filteredData = normalizedData.filter((el) => {
        return (el.title.toLowerCase().includes($('#film-name').value)) &&
            (el.rate >= $('#film-rating').value) &&
            (el.genres.includes( $('#genres').value)) &&
            (el.year >= $('#years').value)
    })
    renderData(filteredData)
}

// Form submit
form.addEventListener('submit', (e) => {
    multiSearch(normalizedData)
    console.log(e)
})

























// -------------------- ORIGINAL FUNCTIONS --------------------


// const someData = movies.splice(1, 100);
// const cardsGrid = $(`#cards`)
// const globalSearch = $('#global-search')
// const genresSelect = $('#genres')
// const form = $('#form')
//
//
// // Normalized data
// let normalizedData = someData.map((movie) => {
//     return {
//         title: movie.title,
//         year: movie.year,
//         genre: movie.categories,
//         id: movie.imdbId,
//         rating: movie.imdbRating,
//         runtime: `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
//         language: movie.language,
//         youTube: `https://youtube.com/embed/${movie.youtubeId}`,
//         summary: movie.summary,
//         smallImg: movie.smallThumbnail,
//         bigImg: movie.bigThumbnail,
//     }
// })
//
// // Reusable Rendering function
// function renderData(data) {
//     cardsGrid.innerHTML = `
//         <div class="loader-wrapper">
//             <div class="loader"></div>
//         </div>
// `;
//     setTimeout(()=>{
//
//         if(data.length){
//
//             cardsGrid.innerHTML = ''
//
//             data?.forEach((el) => {
//
//                 const card = createElement('div', 'card', `
//
//                 <div class="card-img">
//                         <img src="${el.bigImg}" alt="img">
//                     </div>
//
//                     <div class="card-body">
//                         <h2>${el.title.substring(0, 20)}...</h2>
//                         <ul>
//                             <li><strong>Year: </strong><span>${el.year}</span></li>
//                             <li><strong>Rating: </strong><span>${el.rating}</span></li>
//                             <li><strong>Language: </strong><span>${el.language}</span></li>
//                             <li><strong>Genre: </strong><span class="text-[12px]">${el.genre}</span></li>
//                             <li><strong>Time: </strong><span>${el.runtime}</span></li>
//                         </ul>
//                         <div class="buttons">
//                             <button>Read more</button>
//                             <button class="like-btn"><img src="assets/icons/heart.svg" alt="heart"></button>
//                         </div>
//                     </div>
//             `)
//                 cardsGrid.appendChild(card)
//
//             })
//         } else{
//             cardsGrid.innerHTML = `<h1 class="text-red">ERROR 404 DATA NOT FOUND!!!</h1>`
//         }
//     }, 1000)
//
// }
//
// // Rendering data
// renderData(normalizedData)
//
// // Global Search
// globalSearch.addEventListener('keyup', (e) =>  {
//     console.log( e.target.value.toLowerCase())
//     let filteredData = normalizedData.filter((el) => (el.title.toLowerCase().includes(e.target.value)))
//     renderData(filteredData)
// })
//
// // Filter options
// function filteredOptions (state) {
//     const options = [];
//     state?.forEach((el) => {
//         el.genre.forEach((g) => {
//            if(!options.includes(g)) {
//                options.push(g)
//            }
//         })
//     })
//
//     options.sort()
//     return options;
// }
//
// // Render options
// function renderOptions(state) {
//
//     state.forEach((el) => {
//         const option = createElement('option', 'option-item', el)
//         console.log(option)
//         genresSelect.appendChild(option)
//     })
// }
// renderOptions(filteredOptions(normalizedData))
//
// // Multi searching
// function multiSearch(state){
//     // Filter by title
//     let filteredData = state.filter((el) => {
//         return el.title.toLowerCase().includes($('#film-name').value.toLowerCase()) &&
//                 el.rating <= $('#film-rating').value  &&
//                 el.genre.includes($('#genres').value)
//     })
//     renderData(filteredData)
// }
//
// form.addEventListener('submit', (e)=>{
//     console.log('submit')
//     multiSearch(normalizedData)
// })
//
















