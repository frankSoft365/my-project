export function getDateTime() {
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hour = pad(now.getHours());
    const minute = pad(now.getMinutes());
    const second = pad(now.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}