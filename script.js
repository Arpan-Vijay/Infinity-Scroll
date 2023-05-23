// Unsplash API
const count = 10
const apiKey = 'Dpe0V2pBE735__vQl3ZaiT-7S39XhOMdIwfUv2P7jU0'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Get photos from Unsplash API

async function getPhotos () {
    try {
        const response = await fetch(apiUrl)
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

// On Load
getPhotos();