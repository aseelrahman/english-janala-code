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
    <button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
    </button>
    `
    levelContainer.appendChild(btnDiv)
    });
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data))

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
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
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
}
loadLessons()