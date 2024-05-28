// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Валидация номера телефона
function formPhone() {
	document.addEventListener('DOMContentLoaded', function() {
		let phoneInputs = document.querySelectorAll('input[data-tel-input]');
        console.log(phoneInputs, 'phoneInputs')
		
		let getInputNumbersValue = function(input){
			
			return input.value.replace(/\D/g, "");
		}
		console.log(getInputNumbersValue, 'getInputNumbersValue')
		let onPhoneInput = function(e){
			let input = e.target,
			inputNumbersValue = getInputNumbersValue(input),
			formattedInputValue = "",
			selectionStart = input.selectionStart;
			if (!inputNumbersValue) {
				return input.value = "";
			}
	
			if (input.value.length != selectionStart) {
				if (e.data && /\D/g.test(e.data)) {
					input.value = inputNumbersValue;
				}
				return;
			}
	
			if (['3', '8', '0'].indexOf(inputNumbersValue[0]) > -1){
     				// Ukraine phone number
			  if (inputNumbersValue[0] == "8") inputNumbersValue = "3" + inputNumbersValue;
			  if (inputNumbersValue[0] == "0") inputNumbersValue = "38" + inputNumbersValue;
				let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+3";
				formattedInputValue = firstSymbols + " ";
				if (inputNumbersValue.length > 1){
					formattedInputValue += inputNumbersValue.substring(1, 2) + " (";
				}
				if (inputNumbersValue.length >= 2){
					formattedInputValue +=inputNumbersValue.substring(2, 5) + ") ";
				}
			 
				if (inputNumbersValue.length >= 4){
					formattedInputValue += " " + inputNumbersValue.substring(5, 8);
				}
				if (inputNumbersValue.length >= 7){
					formattedInputValue += "-" + inputNumbersValue.substring(8, 10);
				}
				if (inputNumbersValue.length >= 9){
					formattedInputValue += "-" + inputNumbersValue.substring(10, 12);
				}
			}else {
	//Not Ukraine phone number
	formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
	
				}
				input.value = formattedInputValue;
			}
		
			 let onPhoneKeyDown = function(e){
				let input = e.target
				if(e.keyCode == 8 && getInputNumbersValue(input).length == 1) {
	
					input.value = "";
				}
			 }
	let onPhonePaste = function(e){
		let pasted = e.clipboardData || window.clipboardData,
			input = e.target,
			inputNumbersValue = getInputNumbersValue(input);
	
		if (pasted){
			let pastedText = pasted.getData("Text");
			if (/\D/g.test(pastedText)){
				input.value = inputNumbersValue;
				
			}
		}
	};

	phoneInputs.forEach(function(input) {
		input.addEventListener('input', onPhoneInput);
		input.addEventListener("keydown", onPhoneKeyDown);
		input.addEventListener("paste", onPhonePaste);
	})
	});
	
}
formPhone()

// Навигация-содержание с выделением текущего элемента в ней #

// В качестве отслеживаемых элементов использую заголовки с id,
//  которые по сути являюрся якорями
// С учетом того, что на странице одновременно могут находиться 2 
// и более заголовков! Поэтому на все соответствующие заголовкам пункты меню
// добавляю класс is-visible, но только на первый из них мы добавляю класс is-active, 
// которые и подсвечивает ссылку в меню.

function ready(fn) {
	document.addEventListener('DOMContentLoaded', fn, false)
  }
  
ready(() => {
	const TableOfContents = {
		container: document.querySelector('.menu__list'),
		links: null,
		intersectionOptions: {
			rootMargin: '0px',
			threshold: 0.1
		},
		previousSection: null,
		observer: null,

		init() {
			this.handleObserver = this.handleObserver.bind(this)
			this.setUpObserver()
			this.findLinksAndHeadings()
			this.observeSections()
		},		
	
		handleObserver(entries, observer) {
			entries.forEach(entry => {		
				let href = `#${entry.target.getAttribute('id')}`
				let link = this.links.find(item => item.getAttribute('href') === href)
				link = this.links.find(l => l.getAttribute('href') === href)
				link.classList.add('is-visible')			
				if (entry.isIntersecting) {
					link.classList.add('is-visible')
					this.previousSection = entry.target.getAttribute('id');					
				  } else {
					link.classList.remove('is-visible')
				  }
				  this.highlightFirstActive()
			});
		},

		highlightFirstActive() {
			let firstVisibleLink = this.container.querySelector('.is-visible')		
			this.links.forEach(link => {
				link.classList.remove('is-active')
			   })
		 
			   if (firstVisibleLink) {
				 firstVisibleLink.classList.add('is-active')
			   }		 
			   if (!firstVisibleLink && this.previousSection) {
			   
			   this.container.querySelector(
				   `a[href="#${this.previousSection}"]`
				 ).classList.add('is-active')
			}
		},
		
		observeSections() {	
			this.headings.forEach(heading => {
			this.observer.observe(heading)
		})
		  },

		setUpObserver() {
			this.observer = new IntersectionObserver(
			this.handleObserver,
			this.intersectionOptions
		)
		},

		findLinksAndHeadings() {
			this.links = [...this.container.querySelectorAll('a')]
				this.headings = this.links.map(link => {
				let id = link.getAttribute('href')
				return document.querySelector(id)				
			})
		}

	}

	TableOfContents.init();
});

// Reviews

function reviewsHotel() {
	let reviews = [];
loadReviews()
let reviewAdd = document.getElementById('review-add');
console.log('lena')
document.getElementById('review-add').onclick = function() {
	event.preventDefault();
	let reviewName = document.getElementById('nameReview');
	let reviewBody = document.getElementById('formReview');
	let review = {
		name : reviewName.value,
		body : reviewBody.value,
		time : Math.floor(Date.now()/1000) 
	}

	reviewName.value = '';
	reviewBody.value = '';
	reviews.push(review);
	saveReviews();
	showComments();
}	

	function saveReviews() {
		localStorage.setItem('reviews', JSON.stringify(reviews));
	}
	function loadReviews() {
		if (localStorage.getItem('reviews')) reviews = JSON.parse(localStorage.getItem('reviews'));
		showComments();
	}

	function showComments() {
		let reviewsSlide = document.querySelector('.reviews__wrapper');
		let out = '';
		reviews.forEach(function(item){
			out += `
			<div class="reviews__slide swiper-slide">
			<div class="reviews__icon">
			<img src="/./img/icons/reviews.svg" alt="">
		</div>
		<p class="reviews__date"><em>${timeConverter(item.time)}</em></p>
		<blockquote class="reviews__item">
			<div class="reviews__text">
				<p>${item.body}</p>
			</div>
			<cite class="reviews__author">${item.name}</cite>
		</blockquote>
		</div>
			`;
		});
		reviewsSlide.innerHTML = out;
	}
	
	function timeConverter(UNIX_timestamp){
		let a = new Date(UNIX_timestamp * 1000);
		let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		let year = a.getFullYear();
		let month = months[a.getMonth()];
		let date = a.getDate();
		let hour = a.getHours();
		let min = a.getMinutes();
		let sec = a.getSeconds();
		let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		return time;
	  }
}
reviewsHotel()

	//   Мультиязычность
// function lang() {
// 	const header = document.querySelector('.header');
// 	const select = header.querySelector('.select_change-lang');
// 	console.log('select', select)
// 	const langButtons = select.querySelectorAll('[data-value]');

// 	langButtons.forEach((btn) => {
// 		console.log(btn,'btn')
// 		btn.addEventListener(change, (event) => {
// 			// let currentLang = event
// 			console.log('currentLang')


// 		})
// 	})
// 	// select.addEventListener('change', changeURLLanguage)
	
// 	// Переправить на url с указанием языка
// 	function changeURLLanguage(){
// 		console.log('Привет');
// 		let lang = select.value;
// 		// console.log(lang, 'lang')
// 		location.href = window.location.pathname + '#' + lang;
// 	}
// 	// const langArr = {

// 	// }
// }

// lang()
 function langHotel() {
	const allLangs = ['ua','ru','en'];
	let currentLang = localStorage.getItem("language") || checkBrowserLang() || "ua";
	const header = document.querySelector('.header');
	const langButtons = header.querySelectorAll('[data-value]');
	let current = header.querySelector('.current');
	current.innerHTML = localStorage.getItem("language") || "ua";
	
	const currentPathName = window.location.pathname;
	console.log(currentPathName, 'currentPathName');
	let currentText = {};

		const headerTexts = {
			"link-1": {
				ua: "Про готель",
				ru:	"Про отель",
				en: "About the hotel"
			},
			"link-2": {
				ua: "Номери",
				ru: "Номера",
				en: "Rooms"
			},
			"link-3": {
				ua: "Контакти",
				ru: "Контакты",
				en: "Contacts"
			},
			"reservation": {
				ua: "Бронювання",
				ru: "Бронирование",
				en: "Reservation"
			},

		};
		const heroTexts = {
			"hero-title": {
				ua: "Готель в курортному селищi Cхiдниця",
				ru: "Гостиница в курортном поселке Сходница",
				en: "Hotel in the resort village of Chidnytsia"
			},
			"hero-link": {
				ua: "Обрати номер",
				ru: "Выбрать номер",
				en: "Choose a number"
			}
		}

// function checkPagePathName() {
// 	switch (currentPathName) {
// 		case "/index.html":
// 			currentText =  headerTexts;
// 			break;
// 		case "/header.html":
// 			currentText = heroTexts;
// 		default:
// 			currentText = headerTexts;
// 			break;
// 	}
// 	console.log(currentText,'currentText')

// }
// checkPagePathName();

currentText = headerTexts;

function chengeLang() {
	for(const key in currentText) {
	  const elem = document.querySelector(`[data-lang=${key}]`);
	  console.log(elem, 'elem')
	  if (elem) {
		elem.textContent = currentText[key][currentLang];
	
	  }
	
	}
}
chengeLang();


langButtons.forEach((btn) => {
	console.log(btn, 'event')
	btn.addEventListener('click', (event) => {
		console.log('Привет')
		currentLang = event.target.dataset.value;
		localStorage.setItem("language", event.target.dataset.value)
		console.log(currentLang, 'currentLang');
	
		chengeLang();
	})
});

function checkBrowserLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase();
	console.log(navLang, 'navLang')
	const result = allLangs.some(elem=>{
		return elem === navLang;
	});

	if (result){
		return navLang;
	}
 }

 }

 langHotel()