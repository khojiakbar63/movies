const backBtn = $('#back')
// Get Ready DB
const hundredMovies = movies.slice(0, 100)
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
        bigImg: movie.bigThumbnail
    }
})

// console.log(normalizedData.forEach(element => {
//     console.log(element)
// }))
// Get id from local storage
const id = localStorage.getItem('film-id')

// Filter data
const foundMovie = normalizedData.filter((el) => el.id === id)



function renderData(data) {
    cards.innerHTML = '<div class="loader-wrapper"><div class="loader"></div></div>'
    setTimeout(()=> {
        cards.innerHTML = ''
        if (data.length) {
            cards.innerHTML = ''
            data.forEach((el) => {
                const newContent = `

                    <h1 id="title" class="text-center">${el.title}</h1>
                       
                     <iframe 
                        title="Iframe Example"
                        width="560" 
                        height="315" 
                        src="${el.youtube}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                        <video src="https://youtu.be/gZakmIseQWw?si=8ix8e5EPv5v4KKml"></video>
                     </iframe>
                    
                    <div class="card-body">
                        <h3>${el.title}</h3>
                        <strong>Rate:</strong><span>${el.rate}</span> <br>
                        <strong>Year:</strong><span>${el.year}</span> <br>
                        <strong>Language:</strong><span>${el.language}</span> <br>
                        <strong>Genres:</strong><span class="">${el.genres}</span> <br>
                        <strong>Duration:</strong><span>${el.duration}</span>
                        <div class="card-buttons">

                            <label id="like-label" for="like-film">
                                <input data-like="${el.id}" id="like-film" type="checkbox">
                            </label>
                            
                        </div>
                        <strong class="text-[#00ADB5]">Summary</strong>  
                          <p>${el.summary}</p>
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

renderData(foundMovie)

backBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
})