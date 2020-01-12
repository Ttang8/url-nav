let urlList = [];
let frame = document.getElementById('frame');
let currentIndex = 0;
let pages = document.getElementById('pages');
let pageNumber = document.getElementById('page-number');
let total = document.getElementById('total');
let skipBar = document.getElementById('page-skip');

document.querySelector("#file-input").addEventListener('change', function () {
    let all_files = this.files;
    if (all_files.length == 0) {
        return;
    }
    let file = all_files[0];
    let allowed_types = ['text/plain'];
    if (allowed_types.indexOf(file.type) == -1) {
        console.log('wrong file type');
        return;
    }

    let max_size_allowed = 2 * 1024 * 1024
    if (file.size > max_size_allowed) {
        alert('Error : Exceeded size 2MB');
        return;
    }

    let fr = new FileReader()
    fr.addEventListener('load', function (e) {
        urlList = [];
        let text = e.target.result;
        parseText(text)
        loadUrl()
        total.innerHTML = urlList.length
    });
    
    fr.readAsText(file);
});

function handleClick(_value) {
    let tempIndex;
    if(_value) {
        tempIndex = Math.min(currentIndex+1, urlList.length-1);
    } else {
        tempIndex = Math.max(currentIndex-1, 0);
    }
    if(tempIndex == currentIndex) {
        return;
    }
    currentIndex = tempIndex;
    loadUrl();
}

function loadUrl() {
    if(!urlList[currentIndex]) {
        return;
    }
    pages.style.display = "block";
    skipBar.style.display = "flex";
    pageNumber.innerHTML = currentIndex+1;
    // frame.src = urlList[currentIndex];
    let strWindowFeatures = "location=yes,height=900,width=1000,scrollbars=yes,status=yes";
    window.open(urlList[currentIndex], "popup", strWindowFeatures)
    
}

function skipTo() {
    let skipInput = document.getElementById('skip-input');
    let value = skipInput.value;
    let page = parseInt(value)
    if(isNaN(page)) {
        alert('not a number');
        return;
    }
    if(page < 0 || page > urlList.length) {return;}
    currentIndex = page-1;
    loadUrl();
}

function parseText(_text) {
    _text = _text.replace(/\"/g, "");
    _text = _text.replace(/\n/g, "");
    _text = _text.replace(/" "/g, "");
    // let lines = text.split('\n');
    let urls = _text.split(",");
    urls.forEach(url => {
        if (url != "") {
            urlList.push(url)
        }
    })
}

function handleTextArea() {
    urlList = [];
    let ta = document.getElementById('text-area-input');
    let text = ta.value;
    parseText(text);
    loadUrl()
    total.innerHTML = urlList.length
    toggleInputButtons(false);
    ta.value = "";
}

function toggleInputButtons(value) {
    let textArea = document.getElementById('text-input');
    let buttons = document.getElementById('input-buttons');
    if(value) {
        textArea.style.display = "flex";
        buttons.style.display = "none";
    } else {
        textArea.style.display = "none";
        buttons.style.display = "flex";
    }
}