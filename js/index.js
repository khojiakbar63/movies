const someData = movies.splice(1, 100);
const cardsGrid = $(`#cards`)

// Normalizing
let normalizeData = someData.map((movie) => {
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

// Rendering
function renderData(data) {
    if(data.length){
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
    }

}

renderData(normalizeData)


























