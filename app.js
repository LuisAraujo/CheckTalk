word = document.getElementById("word");
pronunciation = document.getElementById("produnciation");
btSound = document.getElementById("sound");
btNext = document.getElementById("bt-next");
btPior = document.getElementById("bt-prior");
mediasound = document.getElementById("mediasound");
player = document.getElementById("player");
listWords = ['hello', 'morning', 'today'];
currentWord = 0;

async function getWord(wordResqueted) {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+wordResqueted;
    try {
        const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    word.innerHTML = json[0].word;
    phonetcs = "";
    wordsound="";
    if(json[0].phonetic != undefined)
        phonetcs=json[0].phonetic;
    if(typeof json[0].phonetics == "object"){
        json[0].phonetics.forEach(element => {
        if(element.text != undefined){
            phonetcs=element.text; 
        }
    });
    }
    console.log(json[0]);
    if(json[0].audio != undefined){
        wordsound=json[0].audio;
    }if(typeof json[0].phonetics == "object"){
        json[0].phonetics.forEach(element => {
        console.log(element.audio);
        if(element.audio != undefined){
            wordsound = wordsound==""?element.audio:wordsound; 
        }
    });
    }


      pronunciation.innerHTML = phonetcs;
      mediasound.src = wordsound;
      
    } catch (error) {
      console.error(error.message);
    }
  }

  btNext.addEventListener("click", function(){
    if(currentWord<listWords.length)
        currentWord++;
    getWord(listWords[currentWord])
  });

  btPior.addEventListener("click", function(){
    if(currentWord>0)
        currentWord--;
    getWord(listWords[currentWord])
  });

  btSound.addEventListener("click", function(){
    player.load();
    player.play();
  });
  getWord(listWords[currentWord]);