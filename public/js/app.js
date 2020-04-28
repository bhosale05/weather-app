console.log('Loaded')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgfirst = document.querySelector('#msg1')
const msgsecond = document.querySelector('#msg2')


weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()

    msgfirst.textContent = 'Loading...'
    msgsecond.textContent = ''

    const location= search.value
    fetch(`http://localhost:3000/weather?location=${location}`).then((res) => {
    res.json().then((data) => {
        if(data.error){
            msgfirst.textContent = data.error
            msgsecond.textContent = ''
        } else{
            msgfirst.textContent = data.location
            msgsecond.textContent = data.weather_Desc
        }
    })
})
})

