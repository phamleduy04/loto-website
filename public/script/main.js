function changeClass(id, row, col) {
    if (id.className.includes('blank')) return;
    let session = JSON.parse(window.localStorage.getItem('session')) || [];
    if (id.className.includes('clicked')) {
        id.className = 'child-holder';
        session = session.filter(el => !(el.row == row && el.col == col));
    }
    else {
        id.className = 'child-holder clicked';
        session.push({ row, col });
    };
    if (checkWin(session)) {
        if (window.localStorage.getItem('win')) return;
        alert(getRandomWin());
        window.localStorage.setItem('win', true);
    } 
    window.localStorage.setItem('session', JSON.stringify(session));
}

function getRandomWin() {
    const arr = ["ez win", "hên thế", ":o hên dữ", "hên thôi :)", "1 trong hàng tỉ cái highlight đã làm được", "tuổi l"];
    return arr[Math.floor(Math.random() * arr.length)];
}

function checkWin(session) {
    let win = false;
    const values = Object.values(sortData(session));
    console.log(values);
    for (let i = 0; i < values.length; i++) if (values[i] == 5) win = true;
    return win;
};

function sortData(arr) {
    return arr.reduce((pv, cv) => {
        if (pv[cv.row]) pv[cv.row]++;
        else pv[cv.row] = 1;
        return pv;
    }, {});
};