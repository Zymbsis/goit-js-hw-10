import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fulfilledIcon from '../img/fulfilled.svg';
import firstIcon from '../img/bi_x-octagon.svg';
import secondIcon from '../img/bi_x-lg.svg';

const form = document.querySelector('form');
const fieldset = document.querySelector('fieldset');
const input = form.elements.delay;
input.classList.add('form-input');
let isSuccess;
fieldset.addEventListener('click', e => {
  if (e.target.value === 'fulfilled') {
    isSuccess = true;
  } else {
    isSuccess = false;
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = input.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve('Success! Value passed to resolve function');
      } else {
        reject('Error! Error passed to reject function');
      }
    }, delay);
  });

  promise.then(
    value => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      createPopUp(
        `Fulfilled promise in ${delay}ms`,
        '#326101',
        '#59A10D',
        fulfilledIcon,
        secondIcon,
        '#59A10D'
      );
    },
    error => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      createPopUp(
        `Rejected promise in ${delay}ms`,
        '#B51B1B',
        '#EF4040',
        firstIcon,
        secondIcon,
        '#EF4040'
      );
    }
  );

  form.reset();
});

function createPopUp(
  message,
  progressBarColor,
  backgroundColor,
  iconUrl,
  imgSrc,
  buttonBackground
) {
  iziToast.show({
    message: message,
    messageColor: '#fff',
    position: 'topRight',
    progressBarColor: progressBarColor,
    backgroundColor: backgroundColor,
    iconUrl: iconUrl,
    close: false,
    buttons: [
      [
        `<button type="button" style="background-color: ${buttonBackground}"><img src=${imgSrc}></button>`,
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast);
        },
      ],
    ],
  });
}
