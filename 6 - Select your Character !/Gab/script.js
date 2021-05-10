let characters = new Map();

async function downloadCharacters(){
    let response = await fetch("./characters.json");
    let char_array = await response.json();

    for(let c of char_array){
        c._audio = null;
        Object.defineProperty(c, "audio", {
            get : () => {
                if(this._audio == null){
                    c._audio = new Audio(c.select_sound.url);
                }
                return c._audio;
            }
        });

        characters.set(c.name,c);
    }

    return characters;
}

function createElement(tag,options){
    let elem = document.createElement(tag);
    return Object.assign(elem,options);
}

(async function(){
    await downloadCharacters();

    for(let c of characters.values()){
        let rootelem = document.createElement('div');

        let name =  createElement('p',{innerHTML:c.name});
        let desc =  createElement('p',{innerHTML:c.description});
        let small = createElement('img',{src:c.portrait});
        let big =   createElement('img',{src:c.large});
        let icon =  createElement('img',{src:c.serie_icon});
        let audioCtrl = createElement("button",{innerHTML:"Sound",onclick:()=>{c.audio.play()}});

        rootelem.append(name,desc,small,big,icon,audioCtrl)
    
        document.body.append(rootelem);
    }
})();



