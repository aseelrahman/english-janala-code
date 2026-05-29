const createElements = (arr) =>{
    const htmlElements = arr.map(el => `<span class='btn'>${el}</span>`)
    return htmlElements.join('');
    
}

const synonyms = ['hello', 'hi', 'konnichiwa'];
createElements(synonyms)

const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    }
    else{
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('word-container').classList.remove('hidden')
    }
}

const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLessons(data.data))
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = ''

    lessons.forEach(lesson => {
    
    const btnDiv = document.createElement('div')
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
    </button>
    `
    levelContainer.appendChild(btnDiv)
    });
}
const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn')
    lessonButtons.forEach(lessonBtn =>{
        lessonBtn.classList.remove("active")
    })
    // document.getElementsByClassName('lesson-btn').classList.remove('active')
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            removeActive()
            clickBtn.classList.add('active')
            displayLevelWord(data.data)
        })
    }
    
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ''
    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full  rounded-xl py-10 space-y-6 font-bangla">
            <img class="mx-auto" src="assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `
        manageSpinner(false)
        return
    }
    
    words.forEach(word => {
        const card = document.createElement('div')

        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word: "No word found"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl font-medium">${word.meaning ? word.meaning : "No Meaning Found"} / ${word.pronunciation ? word.pronunciation : "No Pronunciation Found"}
            </div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
        `
        wordContainer.appendChild(card)
    })
    manageSpinner(false)
}

const loadWordDetail = async (id) =>{
    const displayWordDetails = (word) =>{
        const detailsBox = document.getElementById("details-container")
        detailsBox.innerHTML = `
            <div>
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
    </div>
    <div>
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
    </div>
    <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
    </div>
    <div>
        <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
        <div class"">${createElements(word.synonyms)}</div>
    </div>
        `
        document.getElementById('my_modal_5').showModal()
    }
    const url =`https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)


}
loadLessons()