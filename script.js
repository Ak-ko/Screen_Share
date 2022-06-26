const videoTag = document.getElementById('video');
const startBtn = document.getElementById('button');

// For Capture live screens
async function shareScreen(){
    try {
        const screens = await navigator.mediaDevices.getDisplayMedia();
        videoTag.srcObject = screens;

        videoTag.onloadedmetadata = () => {
            videoTag.play();
        }
    } catch (err) {
        if(err.message === 'Permission denied') document.write('<h1>Awwn</h1><a href="index.html">Wanna Share</a>');
        console.log('whoops! Error:', err);
    }
}

// video enter pip
function enterPip() {
    videoTag.addEventListener('enterpictureinpicture', () => {
        startBtn.textContent = 'STOP';
    })
}

// video leave pip
function leavePip() {
    videoTag.addEventListener('leavepictureinpicture', () => {
        startBtn.textContent = 'START';
    })
}

// adding p-i-p mode
startBtn.addEventListener('click', async() => {
    if(document.pictureInPictureElement) {
        document
            .exitPictureInPicture()
            .catch(err => {
                 document.write(err);
            });

        leavePip();
    } else{
        enterPip();
        await videoTag.requestPictureInPicture();
    } 
});






// On load
shareScreen();