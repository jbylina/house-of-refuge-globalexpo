import * as yup from 'yup';

export const fields1 = [
    {
        name: 'name',
        label: 'Imię i Nazwisko / Name and Surname',
        type: 'text'
    },
    {
        name: 'phone',
        label: 'Numer telefonu / Phone number',
        type: 'text'
    },
    {
        name: 'phone_when',
        label: 'Kiedy możemy do ciebie dzwonić / When we can call you',
        type: 'text'
    },
    {
        name: 'type_desc',
        label: 'Zasób / Type',
        type: 'none'
    },
    {
        name: 'house',
        label: 'Dom / House',
        type: 'checkbox'
    },
    {
        name: 'flat',
        label: 'Mieszkanie / Flat',
        type: 'checkbox'
    },
    {
        name: 'room',
        label: 'Pokój / Room',
        type: 'checkbox'
    },
    {
        name: 'sofa',
        label: 'Kanapa / Sofa',
        type: 'checkbox'
    },
    {
        name: 'country',
        label: 'Kraj / Country',
        type: 'text'
    },
    {
        name: 'city',
        label: 'Miasto / City',
        type: 'text'
    },
    {
        name: 'postal_code',
        label: 'Kod pocztowy / Postal code',
        type: 'text'
    },
    {
        name: 'address',
        label: 'Adres (ulica, numer budynku, numer mieszkania) / Address (street, building no, flat no)',
        type: 'text'
    },
    {
        name: 'how_many_people',
        label: 'Ile osób przyjmiesz / How may people you can invite',
        type: 'number'
    },
    {
        name: 'people_desc',
        label: 'Jakie osoby / Additional info',
        type: 'textarea'
    },
    {
        name: 'costs',
        label: 'Koszty pobytu / Costs',
        type: 'text'
    },
    {
        name: 'food',
        label: 'Czy wyżywienie jest zapewnione / Do you provide food',
        type: 'checkbox'
    },
    {
        name: 'date',
        label: 'Od kiedy udostępniasz nocleg / When available',
        type: 'date'
    },
    {
        name: 'how_long',
        label: 'Na jak długo udostępniasz nocleg / How long available',
        type: 'text'
    },
    {
        name: 'description',
        label: 'Opisz miejsce noclegu / Describe your place',
        type: 'textarea'
    },
    {
        name: 'pets',
        label: 'Czy mieszkasz ze zwierzętami / Do you live with pets',
        type: 'checkbox'
    },
    {
        name: 'can_live_with_pets',
        label: 'Czy przyjmiesz zwierzęta / Can you live with pets',
        type: 'checkbox'
    },
    {
        name: 'disabled',
        label: 'Udogodnienia osób zniepełnosprawnoscią / Facilities for the disabled',
        type: 'checkbox'
    },
    {
        name: 'transport',
        label: 'Oferujesz transport / Do you offer transport',
        type: 'checkbox'
    },
    {
        name: 'transport_desc',
        label: 'Jaki transport / What kind of transport',
        type: 'textarea'
    },
    {
        name: 'job',
        label: 'Oferujesz pracę / Do you offer any job',
        type: 'checkbox'
    },
    {
        name: 'job_desc',
        label: 'Jaką pracę / What kind of job',
        type: 'text'
    },
    {
        name: 'extra',
        label: 'Dodatkowe uwagi / Additional info',
        type: 'textarea'
    }
];

export const validationSchema1 = () => yup.object({
    // name: yup.string().required('Pole wymagane').max(512),
    // about_info: yup.string().required('Pole wymagane').max(2048),
    // resource: yup.string().required('Pole wymagane'),
    // city: yup.string().required('Pole wymagane').max(512),
    // zip_code: yup.string().required('Pole wymagane').max(8),
    // address: yup.string().required('Pole wymagane').max(512),
    // people_to_accommodate: yup.number().required('Pole wymagane'),
    // age: yup.number().required('Pole wymagane'),
    // languages: yup.string().required('Pole wymagane').max(512),
    // when_to_call: yup.string().required('Pole wymagane'),
    // costs: yup.string().required('Pole wymagane').max(1024),
    // availability: yup.date().required('Pole wymagane'),
    // accommodation_length: yup.number().required('Pole wymagane').min(1).max(1000),
    // details: yup.string().required('Pole wymagane').max(2048),
    // living_with_pets: yup.string().required('Pole wymagane').max(1024),
    // can_take_person_with_pets: yup.string().required('Pole wymagane').max(512),
    // transport: yup.string().required('Pole wymagane'),
    // phone_number: yup.string().required('Pole wymagane')
    //     .matches(/[\s#0-9_\-+/().]/, 'Niepoprawny numer telefonu'),
    // backup_phone_number: yup.string().required('Pole wymagane')
    //     .matches(/[\s#0-9_\-+/().]/, 'Niepoprawny numer telefonu'),
    // email: yup.string().email('Niepoprawny adres email').required('Pole wymagane'),
});

export const fields2 = [
    {
        name: 'registration_date',
        label: 'Сьогоднішня дата',
        subHeading: 'Data rejestracji / registration date',
        type: "date"
    },
    {
        name: 'name',
        label: 'Ім’я та прізвище',
        subHeading: 'Imię i Nazwisko / Name and Surname',
        type: 'text'
    },
    {
        name: 'city_of_origin',
        label: 'Mісто проживання (на Укрїні)',
        subHeading: 'Miasto pochodzenia / city of origin',
        type: 'text'
    },
    {
        name: 'phone_number_pl',
        label: 'Польський номер телефону',
        subHeading: 'Polski numer telefonu / Polish phone number',
        type: 'text'
    },
    {
        name: 'phone_number_ukr',
        label: 'Український номер телефону',
        subHeading: 'Ukraiński numer telefonu / Ukrainian phone number',
        type: 'text'
    },
    {
        name: 'languages_desc',
        label: 'Мови',
        subHeading: 'Języki / Languages',
        type: 'none'
    },
    {
        name: 'languages_ru',
        label: 'Російська',
        subHeading: 'Rosyjski / Russian',
        type: 'checkbox'
    },
    {
        name: 'languages_pl',
        label: 'Польська',
        subHeading: 'Polski / Polish',
        type: 'checkbox'
    },
    {
        name: 'languages_en',
        label: 'Англійська',
        subHeading: 'Angielski / English',
        type: 'checkbox'
    },
    {
        name: 'languages_others',
        label: 'Інші мови',
        subHeading: 'Inne języki / Other languages',
        type: 'text'
    },
    {
        name: 'people_nb',
        label: 'Kількість осіб',
        subHeading: 'Liczba osób / Number of people',
        type: 'number'
    },
    {
        name: 'women',
        label: 'Вік жінки\\жінок',
        subHeading: 'Kobiety wiek / Women age',
        type: 'textarea'
    },
    {
        name: 'men',
        label: 'Bік чоловіка/чоловіків ',
        subHeading: 'Mężczyzni wiek / Men age',
        type: 'textarea'
    },
    {
        name: 'children',
        label: 'Dік дітей',
        subHeading: 'Dzieci wiek / Children age',
        type: 'textarea'
    },
    {
        name: 'disabled',
        label: 'Є хронічно хвора людини або iнвалід',
        subHeading: 'Czy jest ktoś z niepełnosprawnością lub chory przewlekłe / Anyone with a disability or chronic diseases',
        type: 'checkbox'
    },
    {
        name: 'disabled_desc',
        label: 'Яке захворювання чи яка инвалідність',
        subHeading: 'Jaka niepełnosprawność czy choroba / What kind of disability',
        type: 'textarea'
    },
    {
        name: 'pregnant',
        label: 'Є вагітна людина ',
        subHeading: 'Czy jest ktoś w ciąży / Anyone pregnant',
        type: 'checkbox'
    },
    {
        name: 'pet',
        label: 'Tварини',
        subHeading: 'Zwierzę / Pet',
        type: 'checkbox'
    },
    {
        name: 'pet_desc',
        label: 'які тварини',
        subHeading: 'Jakie zwierzę / What kind of animal',
        type: 'textarea'
    },
    {
        name: 'pet_alergic',
        label: 'Aлергія на тварин',
        subHeading: 'Uczulenie na zwierzęta / Alergy to animals',
        type: 'checkbox'
    },
    {
        name: 'preferred_country',
        label: 'Віддаю перевагу країні (хотів/ла б жити в ... країні) ',
        subHeading: 'Preferowany kraj / Preferred country',
        type: 'text'
    },
    {
        name: 'preferred_city',
        label: 'Віддаю перевагу місту (хотів/ла б жити в місті... )',
        subHeading: 'Preferowane miasto / Preferred city',
        type: 'text'
    },
    {
        name: 'how_long_desc',
        label: 'Як довго',
        subHeading: 'Na jak długo / For how long?',
        type: 'textarea'
    },
    {
        name: 'how_long_date',
        label: 'До дня',
        subHeading: 'Do dnia / Till date',
        type: 'date'
    },
    {
        name: 'how_long_months',
        label: 'Kількість місяців',
        subHeading: 'Liczba miesięcy / Number of months',
        type: 'number'
    },
    {
        name: 'how_long_infinite',
        label: 'Без визначеної дати закінчення',
        subHeading: 'Bez terminu / No end date',
        type: 'checkbox'
    },
    {
        name: 'can_pay',
        label: 'Можу платити',
        subHeading: 'Może płacić / Can pay',
        type: 'checkbox'
    },
    {
        name: 'can_pay_pln',
        label: 'Як багато спроможний/на платити щомісячно?',
        subHeading: 'Ile może płacić miesięcznie / How much you can pay',
        type: 'number'
    },
    {
        name: 'cigarettes',
        label: 'Чи э в группі людина що палить?',
        subHeading: 'Ktoś z grupy pali papierosy / Anyone smoking cigarettes',
        type: 'checkbox'
    },
    {
        name: 'job_needed',
        label: 'Потребує роботу',
        subHeading: 'Potrzebna praca / Job needed',
        type: 'checkbox'
    },
    {
        name: 'job_desc',
        label: 'Вид праці',
        subHeading: 'Jaki rodzaj pracy / What kind of job',
        type: 'textarea'
    },
    {
        name: 'car',
        label: 'Є автомобіль',
        subHeading: 'Samochód / Car',
        type: 'checkbox'
    },
    {
        name: 'stamps',
        label: 'Mаємо штампи в\'їзду до Польші ',
        subHeading: 'Pieczątki wjazdu do Polski / Polish border stemps',
        type: 'checkbox'
    },
    {
        name: 'pesel',
        label: 'Польський песель',
        subHeading: 'Polski PESEL / Polish PESEL',
        type: 'checkbox'
    }
];

export const validationSchema2 = ({ publicOnly }) => yup.object({
    // name: yup.string().required('Pole wymagane').max(512),
    // phone_number: yup
    //     .string()
    //     .matches(/[\s#0-9_\-+/().]/, 'Niepoprawny numer telefonu')
    //     .required('Pole wymagane'),
    // people: yup.number().required('Pole wymagane'),
    // how_long: yup.number().required('Pole wymagane'),
    // description: yup.string().required('Pole wymagane'),
    // origin: yup.string().required('Pole wymagane'),
    // traveling_with_pets: yup.string().required('Pole wymagane'),
    // can_stay_with_pets: yup.string().required('Pole wymagane'),
    // contact_person: publicOnly ? yup.string().required('Pole wymagane') : null,
    // languages: yup.string().required('Pole wymagane'),
    // when: yup.date().required('Pole wymagane'),
});



