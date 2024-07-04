const cardItems = $('.card-items')
const card  = $$('.card')
const goBack  = $('#go-back')
const toaster = $('.toaster')
const left = $('.left')
const toast = $('#toast')
// CUT 100 MOVIES FROM ORIGINAL DB
const hundredMovies = movies.slice(0, 100)

let likedFilmsIds = JSON.parse(localStorage.getItem('liked-list'))

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
        bigImg: movie.bigThumbnail
    }
})


let newLikedFilms = []
function findLikedMovies(DB, likedFilmsList) {
    if (likedFilmsList.length){
        DB.forEach(el => {
            if(DB.length){
                likedFilmsList.forEach(itemID => {
                    if(itemID.includes(el.id)){
                        newLikedFilms.push(el)
                    }
                })
            }
        })
    }

}

findLikedMovies(normalizedData, likedFilmsIds)

function renderData(data) {
    cardItems.innerHTML = '<div class="loader-wrapper"><div class="loader"></div></div>'
    setTimeout(()=> {
        cardItems.innerHTML = ''
        if (data.length) {
            cardItems.innerHTML = ''
            data.forEach((el) => {
                const newContent = `
                    <img src="${el.bigImg}" alt="img">
                    <div class="card-body">
                        <h3>${el.title.substring(0, 20)}...</h3>
                        <strong>Rate:</strong><span>${el.rate}</span> <br>
                        <strong>Year:</strong><span>${el.year}</span> <br>
                        <strong>Language:</strong><span>${el.language}</span> <br>
                        <strong>Genres:</strong><span title="${el.genres}" id="hover" class="animate-pulse text-[#424874]">Hover me</span> <br>
                        <strong>Duration:</strong><span>${el.duration}</span>
                        
                        <div class="card-buttons flex gap-[160px]">
                            <button  ><i data-del-btn="${el.id}" id="del-like" class="del-btn fa-solid fa-trash hover:text-[#FF204E]"></i></button>

                            <button data-id="${el.id}" id="read-more" class="read-more-btn hover:text-[#597445]">Read more...</button>
                        </div>
                    </div>
                    
                </div>
`
                const newEl = createElement('div', 'card', newContent);
                cardItems.appendChild(newEl);
            })
        }else {
            cardItems.innerHTML = '<h1 class="mt-[100px] text-[#FF204E] text-[42px]">DATA NOT FOUND</h1>'
        }

    },1000)
}

renderData(newLikedFilms)


// Event delegation

cardItems.addEventListener('click', (e) => {
    if(e.target.getAttribute('id') === 'read-more'  && e.target.tagName  === 'BUTTON') {
        const id = e.target.getAttribute('data-id')
        localStorage.setItem('film-id', id)
        location.href='./read_more.html'
    }
    if(e.target.classList.contains('del-btn')) {
        let id = e.target.getAttribute('data-del-btn')
        removeMovieFromLikedList(id)
        makeToaster('success', `<h2>Congratulations, This video removed from the liked list!</h2>`)

        setTimeout(() => {
            window.location.reload()

        }, 3000)

    }
})

// Remove item from liked list
function removeMovieFromLikedList(id) {
    const leftMovies = likedFilmsIds.filter(item => item !== id)
    localStorage.setItem('liked-list', JSON.stringify(leftMovies))
}










// const  likedFilms = []
//
// function findLikedFilms( likedList, DB) {
//
//         DB.forEach(el => {
//
//                 likedList.forEach(item => {
//
//                     if(likedList.includes(el.id)) {
//                         if(!likedFilms.includes(el))
//                         console.log(likedFilms.push(el))
//                     }
//
//                 })
//
//         })
//
// }

// let res = findLikedFilms(likedFilmsIds, normalizedData)
// console.log(res)
// console.log(likedFilms)


// Agar ikkita list ichidagi qiymatlar tekshirilsa ikkalas array ham ichma ich forEach qilinadi kektmaketlik farq qilmaydi
// va includes orqali qiymat soliwtiriladi va yangi arrayga kiritilmagan el qabul qiliw warti beriladi.