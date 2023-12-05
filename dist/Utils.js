import { question } from 'readline-sync';
const input = (texto) => question(texto);
const getNumber = (texto) => {
    let n = Number(input(texto));
    while (isNaN(n)) {
        n = getNumber(texto);
    }
    return n;
};
const gerarId = () => {
    const id = Math.floor(Math.random() * 100000 + 1);
    return id.toString();
};
export { input, getNumber, gerarId };


