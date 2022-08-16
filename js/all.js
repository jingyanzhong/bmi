const height = document.getElementById('height');
const weight = document.getElementById('weight');
const submitBtn = document.querySelector('.submitBtn');
const bmiBtn = document.querySelector('.bmiBtn');
const bmiNum = document.querySelector('.bmiNum')
const bmiList = document.querySelector('.bmiList');
const resetBtn = document.querySelector('.resetBtn');
const changeBtn = document.querySelector('.headerBtn');
let data = JSON.parse(localStorage.getItem('bmiList')) || [];
//初始畫面
display();

//
function updateBmiList(e) {
    if (height.value === '' || weight.value === '' || height.value <= 0 || weight.value <= 0 ) {
        alert('請輸入身高及體重，數字不可為0或負值');
        return;
    };
    //change BTN
    changeBtn.addEventListener('click', function (e) {
        if (e.target.textContent === '看結果') {
            submitBtn.classList.add('hide');
            bmiBtn.classList.remove('hide')
        } else {
            submitBtn.classList.remove('hide');
            bmiBtn.classList.add('hide')
        }
    });

    const heightNum = parseInt(document.getElementById('height').value) / 100;
    const weightNum = parseInt(document.getElementById('weight').value);
    const bmi = (weightNum / (heightNum * heightNum)).toFixed(1);

    if (bmi >= 18.5 && bmi <= 25) {
        add('perfect', '理想', bmi);
        bmiBtn.setAttribute('id', 'perfectBtn');
    } else if (bmi < 18.5) {
        add('tooLight', '過輕', bmi);
        bmiBtn.setAttribute('id', 'tooLightBtn');
    } else if (bmi > 25 && bmi <= 30) {
        add('fat', '肥胖', bmi);
        bmiBtn.setAttribute('id', 'fatBtn');
    } else if (bmi > 30 && bmi <= 35) {
        add('littleFat', '輕度肥胖', bmi);
        bmiBtn.setAttribute('id', 'littleFatBtn');
    } else if (bmi > 35 && bmi <= 40) {
        add('mediumFat', '中度肥胖', bmi);
        bmiBtn.setAttribute('id', 'mediumFatBtn');
    } else if (bmi > 40) {
        add('tooFat', '重度肥胖', bmi);
        bmiBtn.setAttribute('id', 'tooFatBtn');
    }
    height.value = '';
    weight.value = '';
    bmiNum.textContent = bmi;
};

function add(color, status, bmi) {
    data.push({
        height: height.value,
        weight: weight.value,
        bmi: bmi,
        status: status,
        color: color,
        time: time(),
    });
    let dataStr = JSON.stringify(data);
    localStorage.setItem('bmiList', dataStr);
    display();
};

function display() {
    let str = '';
    data.forEach(function (item) {
        str +=
            '<li class="bmiListCard ' + item.color + '"><p>' + item.status + '</p><span class="bmiListText"><span class="bmiListTitle">BMI</span>' + item.bmi + '</span><span class="bmiListText"><span class="bmiListTitle">weight</span>' + item.weight + 'kg</span><span class="bmiListText"><span class="bmiListTitle">height</span>' + item.height + 'cm</span><span class="bmiListText time">' + item.time + '</span></li>'
    });
    bmiList.innerHTML = str;
};
//清除localStorage資料
function resetBmiList(e) {
    localStorage.removeItem('bmiList');
    data = [];
    display();
}

//時間
function time() {
    let date = new Date();
    let nowTime = `${date.getFullYear()}-${date.getMonth() + 1
        }-${date.getDate()}`;
    return nowTime;
}

submitBtn.addEventListener('click', updateBmiList, false);
resetBtn.addEventListener('click', resetBmiList, false);