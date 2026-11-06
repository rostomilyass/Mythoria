export function formatDate(date = new Date()) {
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second:"2-digit"});  
}

export function generateId() {
    return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function shuffle(arr){
    const a = [...arr];
    for(let i = a.length -1 ; i>0;i--){
        const j = Math.floor(Math.random()*(i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}