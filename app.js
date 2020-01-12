let urlList = [];
let frame = document.getElementById('frame');
let currentIndex = 0;

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
        let text = e.target.result;
        text = text.replace(/\"/g,"");
        text = text.replace(/\n/g,"");
        // let lines = text.split('\n');
        let urls = text.split(",");
        urls.forEach(url => {
            if(url != "") {
                urlList.push(url)
            }
        })
        frame.src = urlList[currentIndex];
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
    frame.src = urlList[currentIndex];
}