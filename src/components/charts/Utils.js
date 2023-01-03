export default function timestamp2str(ts) {
    const date = new Date(ts);
    const y = date.getFullYear().toString();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const m = month[date.getMonth()]
    const d = date.getDate().toString();
    return d + " " + m + " " + y;
}
