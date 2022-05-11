import * as yup from 'yup';

export const fields1 = [
    {
        name: 'name',
        label: 'Imię i Nazwisko/Name & Surname:',
        type: 'text'
    },
    {
        name: 'phone',
        label: 'Numer telefonu/phone number:',
        type: 'text'
    },
    {
        name: 'phone_when',
        label: 'Kiedy możemy do ciebie dzwonić',
        type: 'text'
    },
    {
        name: 'type_desc',
        label: 'Zasób:',
        type: 'none'
    },
    {
        name: 'house',
        label: 'Dom',
        type: 'checkbox'
    },
    {
        name: 'flat',
        label: 'Mieszkanie',
        type: 'checkbox'
    },
    {
        name: 'room',
        label: 'Pokój',
        type: 'checkbox'
    },
    {
        name: 'sofa',
        label: 'Kanapa',
        type: 'checkbox'
    },
    {
        name: 'country',
        label: 'Kraj',
        type: 'text'
    },
    {
        name: 'city',
        label: 'Miasto',
        type: 'text'
    },
    {
        name: 'postal_code',
        label: 'Kod pocztowy',
        type: 'text'
    },
    {
        name: 'address',
        label: 'Adres (ulica, numer budynku, numer mieszkania)',
        type: 'text'
    },
    {
        name: 'how_many_people',
        label: 'Ile osób przyjmiesz',
        type: 'number'
    },
    {
        name: 'people_desc',
        label: 'Jakie osoby:',
        type: 'textarea'
    },
    {
        name: 'costs',
        label: 'Koszty pobytu',
        type: 'text'
    },
    {
        name: 'food',
        label: 'Czy wyżywienie jest zapewnione',
        type: 'checkbox'
    },
    {
        name: 'date',
        label: 'Od kiedy udostępniasz nocleg',
        type: 'date'
    },
    {
        name: 'how_long',
        label: 'Na jak długo udostępniasz nocleg',
        type: 'text'
    },
    {
        name: 'description',
        label: 'Opisz miejsce noclegu',
        type: 'textarea'
    },
    {
        name: 'pets',
        label: 'Czy mieszkasz ze zwierzętami?',
        type: 'checkbox'
    },
    {
        name: 'can_live_with_pets',
        label: 'Czy przyjmiesz zwierzęta?',
        type: 'checkbox'
    },
    {
        name: 'disabled',
        label: 'Udogodnienia osób zniepełnosprawnoscią',
        type: 'checkbox'
    },
    {
        name: 'transport',
        label: 'Oferujesz transport?',
        type: 'checkbox'
    },
    {
        name: 'transport_desc',
        label: 'Jaki transport?',
        type: 'textarea'
    },
    {
        name: 'job',
        label: 'Oferujesz pracę',
        type: 'checkbox'
    },
    {
        name: 'job_desc',
        label: 'Jaką pracę',
        type: 'text'
    },
    {
        name: 'extra',
        label: 'Dodatkowe uwagi',
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
        label: '(UKR) Data rejestracji/registration date:',
        subHeading: 'Data rejestracji/registration date:',
        type: "date"
    },
    {
        name: 'name',
        label: 'Ім’я та прізвище',
        subHeading: 'Imię i Nazwisko/Name & Surname:',
        type: 'text'
    },
    {
        name: 'city_of_origin',
        label: '(UKR) miasto pochodzenia/citi of origin:',
        subHeading: 'miasto pochodzenia/citi of origin:',
        type: 'text'
    },
    {
        name: 'phone_number_pl',
        label: '(UKR) Polski numer telefonu/polish phone number:',
        subHeading: 'Polski numer telefonu/polish phone number:',
        type: 'text'
    },
    {
        name: 'phone_number_ukr',
        label: '(UKR) Ukraiński numer telefonu/ukrainian phone number:',
        subHeading: 'Ukraiński numer telefonu/ukrainian phone number:',
        type: 'text'
    },
    {
        name: 'languages_desc',
        label: '(UKR) Języki/languages',
        subHeading: 'Języki/languages',
        type: 'none'
    },
    {
        name: 'languages_ru',
        label: '(UKR) Rosyjski/Russian:',
        subHeading: 'Rosyjski/Russian:',
        type: 'checkbox'
    },
    {
        name: 'languages_pl',
        label: '(UKR) Polski/Polish:',
        subHeading: 'Polski/Polish:',
        type: 'checkbox'
    },
    {
        name: 'languages_en',
        label: '(UKR) Angielski/English:',
        subHeading: 'Angielski/English:',
        type: 'checkbox'
    },
    {
        name: 'languages_others',
        label: '(UKR) Inne języki/Other languages:',
        subHeading: 'Inne języki/Other languages:',
        type: 'text'
    },
    {
        name: 'people_desc',
        label: '(UKR) Liczba osób/number of people:',
        subHeading: 'Liczba osób/number of people:',
        type: 'none'
    },
    {
        name: 'women',
        label: '(UKR) Kobieta wiek/Woman age:',
        subHeading: 'Kobieta wiek/Woman age:',
        type: 'textarea'
    },
    {
        name: 'men',
        label: '(UKR) Mężczyzna wiek/Men age:',
        subHeading: 'Mężczyzna wiek/Men age:',
        type: 'textarea'
    },
    {
        name: 'children',
        label: '(UKR) Dzieci wiek/Children age:',
        subHeading: 'Dzieci wiek/Children age:',
        type: 'textarea'
    },
    {
        name: 'disabled',
        label: '(UKR) Ktoś z niepełnosprawnością lub chory przewlekłe/anyone with a disability or chronic diseases:',
        subHeading: 'Ktoś z niepełnosprawnością lub chory przewlekłe/anyone with a disability or chronic diseases:',
        type: 'checkbox'
    },
    {
        name: 'disabled_desc',
        label: '(UKR) Jaka niepełnosprawność czy choroba:',
        subHeading: 'Jaka niepełnosprawność czy choroba:',
        type: 'textarea'
    },
    {
        name: 'pregnant',
        label: '(UKR) Ktoś w ciąży/anyone pregnant:',
        subHeading: 'Ktoś w ciąży/anyone pregnant:',
        type: 'checkbox'
    },
    {
        name: 'pet',
        label: '(UKR) Zwierzę/pet:',
        subHeading: 'Zwierzę/pet:',
        type: 'checkbox'
    },
    {
        name: 'pet_desc',
        label: '(UKR) Jakie zwierzę:',
        subHeading: 'Jakie zwierzę:',
        type: 'textarea'
    },
    {
        name: 'pet_alergic',
        label: '(UKR) Uczulenie na zwierzęta/alergy to animals:',
        subHeading: 'Uczulenie na zwierzęta/alergy to animals:',
        type: 'checkbox'
    },
    {
        name: 'preferred_country',
        label: '(UKR) Preferowany kraj/preferred country:',
        subHeading: 'Preferowany kraj/preferred country:',
        type: 'text'
    },
    {
        name: 'preferred_city',
        label: '(UKR) Preferowane miasto/preferred city:',
        subHeading: 'Preferowane miasto/preferred city:',
        type: 'text'
    },
    {
        name: 'how_long_desc',
        label: '(UKR) Na jak długo/for how long?',
        subHeading: 'Na jak długo/for how long?',
        type: 'textarea'
    },
    {
        name: 'how_long_date',
        label: '(UKR) Do dnia/till date:',
        subHeading: 'Do dnia/till date:',
        type: 'date'
    },
    {
        name: 'how_long_months',
        label: '(UKR) Liczba miesięcy/number of months:',
        subHeading: 'Liczba miesięcy/number of months:',
        type: 'number'
    },
    {
        name: 'how_long_infinite',
        label: '(UKR) Bez terminu/no end date:',
        subHeading: 'Bez terminu/no end date:',
        type: 'checkbox'
    },
    {
        name: 'can_pay',
        label: '(UKR) Może płacić/can pay:',
        subHeading: 'Może płacić/can pay:',
        type: 'checkbox'
    },
    {
        name: 'can_pay_pln',
        label: '(UKR) Ile może płacić miesięcznie',
        subHeading: 'Ile może płacić miesięcznie',
        type: 'number'
    },
    {
        name: 'cigarettes',
        label: '(UKR) Ktoś z grupy pali papierosy/anyone smoking cigarettes:',
        subHeading: 'Ktoś z grupy pali papierosy/anyone smoking cigarettes:',
        type: 'checkbox'
    },
    {
        name: 'job_needed',
        label: '(UKR) Potrzebna praca/job needed:',
        subHeading: 'Potrzebna praca/job needed:',
        type: 'checkbox'
    },
    {
        name: 'job_desc',
        label: '(UKR) Potrzebna praca/job needed:',
        subHeading: 'Potrzebna praca/job needed:',
        type: 'textarea'
    },
    {
        name: 'car',
        label: '(UKR) Samochód/car:',
        subHeading: 'Samochód/car:',
        type: 'checkbox'
    },
    {
        name: 'stamps',
        label: '(UKR) Pieczątki wjazdu do Polski/Polish boarder stemps:',
        subHeading: 'Pieczątki wjazdu do Polski/Polish boarder stemps:',
        type: 'checkbox'
    },
    {
        name: 'pesel',
        label: '(UKR) Polski Pesel/Polish pesel:',
        subHeading: 'Polski Pesel/Polish pesel:',
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



