
/*Toaster*/
const toasterCard = document.querySelector('#toaster')
const toasterStart = document.querySelector('.toaster-start')
const toasterMiddle = document.querySelector('.toaster-middle')
const toasterEnd = document.querySelector('.toaster-end')
const hideBtn = document.querySelector('#hide-btn')

// makeToaster('success', `<h2>Congratulations, you did it right!</h2>`)

// makeToaster('warning', `<h2>Warning: You had better stop here!</h2>` )

// makeToaster('error', `<h2>Oops, you did it wrong!</h2>`)

function makeToaster (type, message) {
    if(type === 'success') {
        toasterStart.classList.add('bg-success')
        toasterEnd.classList.add('color-success')
        toasterMiddle.innerHTML = message
        toasterCard.classList.add('show')

        toasterStart.classList.remove('bg-warning', 'bg-error')
        toasterEnd.classList.remove('color-warning', 'color-error')
        setTimeout(()=>{
            toasterCard.classList.remove('show')
        }, 10000)
    }
    if(type === 'warning') {
        toasterStart.classList.add('bg-warning')
        toasterEnd.classList.add('color-warning')
        toasterMiddle.innerHTML = message
        toasterCard.classList.toggle('show')

        toasterStart.classList.remove('bg-success', 'bg-error')
        toasterEnd.classList.remove('color-success', 'color-error')
        setTimeout(()=>{
            toasterCard.classList.remove('show')
        }, 10000)
    }
    if(type === 'error') {
        toasterStart.classList.add('bg-error')
        toasterEnd.classList.add('color-error')
        toasterMiddle.innerHTML = message
        toasterCard.classList.add('show')


        toasterStart.classList.remove('bg-warning', 'bg-success')
        toasterEnd.classList.remove('color-warning', 'color-success')
        setTimeout(()=>{
            toasterCard.classList.remove('show')
        }, 10000)
    }
}

hideBtn.addEventListener('click', () => {
    toasterCard.classList.remove('show')
})

// Toaster end