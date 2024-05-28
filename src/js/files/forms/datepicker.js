/* Календар */

// Підключення функціоналу "Чертоги Фрілансера"
// Підключення списку активних модулів
import { flsModules } from "../modules.js";

// Підключення модуля
import datepicker from 'js-datepicker';

// const  start  =  datepicker ( '.start' ,  {  id : 1  } ) ;
// const  end  =  datepicker ( '.end' ,  {  id : 1  } );
// new AirDatepicker('#input', {
//     range: true,
//     multipleDatesSeparator: ' - '
// });

if (document.querySelector('[data-datepicker]')) {

	const  start  =  datepicker ( '.start' ,  {  id : 1,
	
		customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
		customMonths: ["Січ", "Лют", "Берез", "Квіт", "Трав", "Черв", "Лип", "Серп", "Верес", "Жовт", "Листоп", "Груд"],
		overlayButton: 'Застосувати',
		overlayPlaceholder: 'Рік (4 цифри)',
		startDay: 1,
		formatter: (input, date, instance) => {
			const value = date.toLocaleDateString()
			input.value = value
		},
		onSelect: function (input, instance, date) {
		}	
	
	} ) 
	const  end  =  datepicker ( '.end' ,  {  id : 1,
		customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
		customMonths: ["Січ", "Лют", "Берез", "Квіт", "Трав", "Черв", "Лип", "Серп", "Верес", "Жовт", "Листоп", "Груд"],
		overlayButton: 'Застосувати',
		overlayPlaceholder: 'Рік (4 цифри)',
		startDay: 1,
		formatter: (input, date, instance) => {
			const value = date.toLocaleDateString()
			input.value = value
		},
		onSelect: function (input, instance, date) {
		}  } )

	// const picker = datepicker('[data-datepicker]', {
	
	// });
	// flsModules.datepicker = picker;
	flsModules.datepicker = start;
	flsModules.datepicker = end;

	

}


