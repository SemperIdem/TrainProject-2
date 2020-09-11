import {postData} from '../services/requests';

const calc = (size, material, options, promo, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promoBlock = document.querySelector(promo),
          resultBlock = document.querySelector(result);

    let sum = 0;
    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promoBlock.value === "IWANTPOPART") {
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
    };

    function sendData() {

    }

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promoBlock.addEventListener('input', calcFunc);


    const form = document.querySelector('.calc_form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        let price = document.querySelector('.calc-price');
        console.log('PRICE ');
        formData.append('price', price.textContent);
        console.log(formData.getAll('price'));
        postData('assets/server.php', formData)
        .then(res => {
            console.log('SUBMIT OK');
            console.log(res);
            //statusImg.setAttribute('src', message.ok); 
           // textMessage.textContent = message.succes;
        })
        .catch(() => {
            console.log('SUBMIT NOTOK');
           // statusImg.setAttribute('src', message.fail);
           // textMessage.textContent = message.failure;
        });
    });
};

export default calc;