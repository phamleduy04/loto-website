let numbers = [];
for (let i = 1; i < 100; i++) numbers.push(i);
numbers = _.shuffle(numbers);
const pickedList = [];
function roll() {
    const pick = numbers.shift();
    alert(pick);
    pickedList.push(pick);
}

function list() {
    if (pickedList.length === 0) return alert("Danh sách trống!");
    alert(pickedList.join(" "));
}

function verify() {
    const numbers = prompt("Nhập các số cần kiểm tra (cách nhau bởi dấu cách)\nVD: 30 69 44");
    if (!numbers) return;
    const list = numbers.split(" ");
    if (list.length == 0) return;
    const result = _.difference(list.map(el => parseInt(el)), pickedList).filter(el => !isNaN(el));
    if (result.length !== 0) return alert(`Số ${result.join(" ")} không nằm trong danh sách!`);
    return alert('Tất cả các số bạn đưa đều trong danh sách!');
    
}