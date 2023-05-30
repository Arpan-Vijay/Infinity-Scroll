const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')



let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
let count = 10;
const apiKey = 'Dpe0V2pBE735__vQl3ZaiT-7S39XhOMdIwfUv2P7jU0'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// Check if all images were loaded.
function imageLoaded() {
    console.log('images loaded', imagesLoaded)
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        loader.hidden = true
        ready = true
        count = 30
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
        console.log('ready', ready)

    }
}


// Create Elements For Links and Photos, Add to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length
    console.log('total Images', totalImages)
    // Run the function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html)
        item.setAttribute('target', '_blank')

        // Create <img> for photo
        const image = document.createElement('img')
        image.setAttribute('src', photo.urls.regular)
        image.setAttribute('alt', photo.alt_description)
        image.setAttribute('title', photo.alt_description)

        // Event Listener, check when each photo is finished loading.
        image.addEventListener('load', imageLoaded);

        // Lastly put <img> tag inside <a> tag, then put them inside the image-container
        item.appendChild(image)
        imageContainer.appendChild(item)
    })
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error)
    }
}

// Check to see if scrolling near bottom of page, Load More Images
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()

    }
})

// On Load
getPhotos();