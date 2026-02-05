

const socket = io()

//elements 

const $messageform = document.querySelector('#chat-form')
const $messagelocation = document.querySelector('#send-location')

const $messageforminput = $messageform.querySelector('input')
const $messageformButton = $messageform.querySelector('button')

const $message = document.querySelector('#messages')

//tmemplate
const messagetemplate = document.querySelector('#msg-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidetemplate = document.querySelector('#sidebar-template').innerHTML

//options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })




const autoscroll = () => {
    // const $newMessage = $message.lastElementChild
    // if (!$newMessage) return

    // const visibleHeight = $message.offsetHeight
    // const containerHeight = $message.scrollHeight
    // const scrollTop = $message.scrollTop

    // // Are we near the bottom?
    // const isNearBottom =
    //     containerHeight - (scrollTop + visibleHeight) < 50

    requestAnimationFrame(() => {
        $message.scrollTop = $message.scrollHeight
    })

}




socket.on('message', (message) => {
    console.log(message)

    const html = Mustache.render(messagetemplate,
        {
            username: message.username,
            message: message.text,
            createdAt: new Intl.DateTimeFormat('en-IN', {
                hour: 'numeric',
                minute: 'numeric'
            }).format(new Date(message.createdAt)),
        }
    )
    $message.insertAdjacentHTML('beforeend', html)
    autoscroll()
})


socket.on('LocationMessage', (message) => {
    // console.log(url);
    const html = Mustache.render(locationTemplate,
        {
            username: message.username,
            url: message.url,
            createdAt: new Intl.DateTimeFormat('en-IN', {
                hour: 'numeric',
                minute: 'numeric'
            }).format(new Date(message.createdAt)),
        })
    $message.insertAdjacentHTML('beforeend', html)
    autoscroll()
})


socket.on('roomData', ({ room, users }) => {

    const html = Mustache.render(sidetemplate,
        {
            room,
            users
        })
    document.querySelector('#sidebar').innerHTML = html
})



// socket.on('CountUpdated' , (count)=>{
//     console.log('The count has been updated' , count)
// }) 

// document.querySelector('#inc').addEventListener('click' , ()=>{
//     console.log("Clicked!")
//     socket.emit('inc')
// })

$messageform.addEventListener('submit', (e) => {
    e.preventDefault()

    //disable button 
    $messageformButton.setAttribute('disabled', 'disabled')


    // const message = document.querySelector('input').value
    const message = e.target.elements.message.value
    socket.emit('SendMessage', message, (error) => {
        // console.log('The message was delivered : ' , message)

        //enable button 
        $messageformButton.removeAttribute('disabled')
        //clearing input 
        $messageforminput.value = ''
        //focus on input
        $messageforminput.focus()


        if (error) {
            return console.log(error)
        }
        console.log('Messsage Delivered')
    })
})


document.querySelector('#send-location').addEventListener('click', () => {
    $messagelocation.setAttribute('disabled', 'disabled')
    if (!navigator.geolocation) {
        return alert('Not Supported')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (error) => {

            $messagelocation.removeAttribute('disabled')
            if (error) {
                return console.log(error)
            }
            console.log('location Delivered')

        })
    })
})


socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})