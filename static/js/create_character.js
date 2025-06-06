window.onload = function () {
    const fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    console.log("Loaded JSON:", jsonData);

                    let name = jsonData.char_name;
                    let char_id = jsonData.id;
                    localStorage.setItem('charName', name);
                    localStorage.setItem('charId', char_id);
                    window.location.href = '/client';
                } catch (err) {
                    console.error("Invalid JSON:", err);
                }
            };
        reader.readAsText(file);
        }
    });
};

function createCharacter() {
    name = prompt("Enter your name:");
    char_id = generateUUIDv4();
    character = {
        char_name: name,
        id: char_id
    };
    saveCharacter()
}

function saveCharacter() {
    const data = JSON.stringify(character, null, 2);
    const blob = new Blob([data], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${character.char_name}.json`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    localStorage.setItem('charName', name);
    localStorage.setItem('charId', char_id);
    window.location.href='/client';

}

function generateUUIDv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function selectCharacter() {
    fileInput.click();
}

